import parse from "csv-parse/lib/sync";
import { promises as fs } from "fs";
import { resolve } from "path";
import _ from "lodash";
import { program } from "commander";

program.option("-f, --folder <folder>", "folder with csv files");

program.on("--help", () => {
  console.log("");
  console.log("Example call:");
  console.log("  $ npm start -- -f ../../data/files");
  console.log("");
  console.log("If getting memory heap error:");
  console.log("  $ npm start-mem -- -f ../../data/files");
});

program.parse(process.argv);

if (process.argv.length < 3) {
  program.help();
}

const main = async () => {
  const path = resolve(program.folder);
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

  const matches = picks.map((game: any) => {
    const { date, team_1, team_2, match_id, event_id, best_of, ...veto } = game;
    const result = results[game.match_id];
    let econ = economy[game.match_id];
    let matchPlayers = players[game.match_id];

    return {
      date,
      team_1,
      team_2,
      match_id,
      event_id,
      best_of,
      picks: veto,
      players: matchPlayers
        ? matchPlayers.map(
            ({
              date,
              opponent,
              match_id,
              event_id,
              event_name,
              best_of,
              map_1,
              map_2,
              map_3,
              ...rest
            }: any) => rest
          )
        : null,
      maps: result.map(
        ({
          result_1,
          result_2,
          map_winner,
          starting_ct,
          ct_1,
          t_2,
          t_1,
          ct_2,
          _map,
        }: any) => {
          let mapEcon = econ
            ? econ.find((map: any) => map._map === _map)
            : null;

          if (mapEcon) {
            const {
              date,
              match_id,
              event_id,
              team_1,
              team_2,
              best_of,
              _map,
              t1_start,
              t2_start,
              ...rest
            } = mapEcon;
            mapEcon = rest;
          }

          return {
            result_1,
            result_2,
            map_winner,
            starting_ct,
            ct_1,
            t_2,
            t_1,
            ct_2,
            _map,
            economy: mapEcon,
          };
        }
      ),
    };
  });

  const json = matches.map((match: any) => JSON.stringify(match)).join(",\n");
  fs.writeFile(path + "/output.json", `[${json}]`);
};

main();
