import { Pick, Player, Result } from "./types";

export const getFieldsFromPick = ({
  match_id,
  best_of,
  system,
  t1_removed_1,
  t1_removed_2,
  t1_removed_3,
  t2_removed_1,
  t2_removed_2,
  t2_removed_3,
  t1_picked_1,
  t2_picked_1,
}: Pick) => ({
  id: `${match_id}-pick`,
  best_of,
  system,
  t1_removed_1,
  t1_removed_2,
  t1_removed_3,
  t2_removed_1,
  t2_removed_2,
  t2_removed_3,
  t1_picked_1,
  t2_picked_1,
});

export const getFieldsFromEcon = ({
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
}: any) => ({
  id: `${match_id}-${_map}-econ`,
  rest,
});

export const getFieldsFromMapResult = ({
  result_1,
  result_2,
  map_winner,
  starting_ct,
  ct_1,
  t_2,
  t_1,
  ct_2,
  _map,
  match_id,
}: any) => ({
  result_1,
  result_2,
  map_winner,
  starting_ct,
  ct_1,
  t_2,
  t_1,
  ct_2,
  _map,
  id: `${match_id}-${_map}`,
  content_type: "map",
});

export const getFieldsFromMatchResult = ({
  date,
  team_1,
  team_2,
  event_id,
  rank_1,
  rank_2,
  map_wins_1,
  map_wins_2,
  match_winner,
  match_id,
}: Result) => ({
  date,
  team_1,
  team_2,
  event_id,
  rank_1,
  rank_2,
  map_wins_1,
  map_wins_2,
  match_winner,
  content_type: "match",
  id: match_id,
});

export const getFieldsFromPlayer = ({
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
}: Player) => ({ content_type: "player", id: rest.player_id, ...rest });
