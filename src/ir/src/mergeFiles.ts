import parse from "csv-parse/lib/sync";
import { promises as fs } from "fs";
import { resolve } from "path";
import _ from "lodash";
import { program } from "commander";
import {
  getFieldsFromPick,
  getFieldsFromMatchResult,
  getFieldsFromEcon,
  getFieldsFromMapResult,
  getFieldsFromPlayer,
} from "./getters";

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

const parseFiles = async (path: string) => {
  const resultsFile = await fs.readFile(path + "/results.csv");
  const picksFile = await fs.readFile(path + "/picks.csv");
  const playersFile = await fs.readFile(path + "/players.csv");
  const economyFile = await fs.readFile(path + "/economy.csv");

  let picks = parse(picksFile, { columns: true });
  let players = parse(playersFile, { columns: true });
  let results = parse(resultsFile, { columns: true });
  let economy = parse(economyFile, { columns: true });

  results = _.groupBy(results, "match_id");
  economy = _.groupBy(economy, "match_id");
  players = _.groupBy(players, "match_id");
  picks = Object.fromEntries(
    picks.map(({ match_id, ...rest }: any) => [match_id, rest])
  );

  return { picks, results, economy, players };
};

const buildMatches = (
  results: any[],
  economy: any[],
  picks: any[],
  players: any[]
) =>
  Object.entries(results).map(([match_id, result]: any) => {
    let econ = economy[match_id];
    let matchPlayers = players[match_id];
    let pick = picks[match_id];

    if (pick) {
      pick = getFieldsFromPick(pick);
    }

    return {
      ...getFieldsFromMatchResult(result[0]),
      picks: pick,
      players: matchPlayers
        ? matchPlayers.map((player: any) => getFieldsFromPlayer(player))
        : null,
      maps: result.map((mapResult: any) => {
        let mapEcon = econ
          ? econ.find((map: any) => map._map === mapResult._map)
          : null;

        if (mapEcon) {
          mapEcon = getFieldsFromEcon(mapEcon);
        }

        return {
          ...getFieldsFromMapResult(mapResult),
          economy: mapEcon,
        };
      }),
    };
  });

const writeMatches = async (path: string, matches: any[]) => {
  const json = matches.map((match: any) => JSON.stringify(match)).join(",\n");
  await fs.writeFile(path + "/output.json", `[${json}]`);
  console.log("Wrote output file to:", path + "/output.json");
};

const main = async () => {
  setupProgram();
  const path = resolve(program.folder);
  const { results, economy, picks, players } = await parseFiles(path);
  const matches = buildMatches(results, economy, picks, players);
  writeMatches(path, matches);
};

main();
