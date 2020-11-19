import parse from "csv-parse/lib/sync";
import { promises as fs } from "fs";
import { resolve } from "path";
import _, { Dictionary } from "lodash";
import { program } from "commander";
import {
  getFieldsFromPick,
  getFieldsFromMatchResult,
  getFieldsFromMapResult,
  getFieldsFromPlayer,
} from "./getters";
import {
  Article,
  NewsMap,
  Pick,
  PicksMap,
  Player,
  Result,
  Match,
} from "./types";

const setupProgram = () => {
  program.option("-f, --folder <folder>", "folder with csv files");

  program.on("--help", () => {
    console.log("");
    console.log("Example call:");
    console.log("  $ npm start -- -f ../../data/files");
    console.log("");
    console.log("If getting memory heap error:");
    console.log("  $ npm run start-mem -- -f ../../data/files");
  });

  program.parse(process.argv);

  if (process.argv.length < 3) {
    program.help();
  }
};

const cast = (value: string) => {
  if (!isNaN(+value) && !(value === "")) {
    return Number(value);
  }
  return value;
};

const parseFiles = async (path: string) => {
  const resultsFile = await fs.readFile(path + "/results.csv");
  const picksFile = await fs.readFile(path + "/picks.csv");
  const playersFile = await fs.readFile(path + "/players.csv");
  const newsFile = await fs.readFile(path + "/news.csv");

  let picks = parse(picksFile, {
    columns: true,
    cast,
  });
  let players = parse(playersFile, { columns: true, cast });
  let results = parse(resultsFile, { columns: true, cast });
  let news = parse(newsFile, { columns: true, cast });

  results = _.groupBy(results, "match_id");
  players = _.groupBy(players, "match_id");
  picks = Object.fromEntries(picks.map((pick: Pick) => [pick.match_id, pick]));
  news = Object.fromEntries(
    news.map((article: Article) => [article.match_id, article])
  );

  return { picks, results, players, news };
};

const buildMatches = (
  results: Dictionary<Result[]>,
  picks: PicksMap,
  players: Dictionary<Player[]>,
  news: NewsMap
): Match[] =>
  Object.entries(results).map(([match_id, result]: [string, Result[]]) => {
    let matchPlayers = players[match_id]
      ? players[match_id].map((player) => getFieldsFromPlayer(player))
      : [];
    let pick = picks[match_id] ? getFieldsFromPick(picks[match_id]) : null;
    let article = news[match_id] ? news[match_id].text : "";

    const maps = result.map((mapResult) => {
      return getFieldsFromMapResult(mapResult);
    });

    const _childDocuments_: (
      | Partial<Player>
      | Partial<Result>
      | Partial<Pick>
    )[] = [...matchPlayers, ...maps];
    if (pick) _childDocuments_.push(pick);

    const res = {
      ...getFieldsFromMatchResult(result[0]),
      article,
      _childDocuments_,
    };

    return res;
  });

const writeMatches = async (path: string, matches: Match[]) => {
  const json = matches.map((match) => JSON.stringify(match)).join(",\n");
  await fs.writeFile(path + "/output.json", `[${json}]`);
  console.log("Wrote output file to:", path + "/output.json");
};

const main = async () => {
  setupProgram();
  const path = resolve(program.folder);
  const { results, picks, players, news } = await parseFiles(path);
  const matches = buildMatches(results, picks, players, news);
  writeMatches(path, matches);
};

main();
