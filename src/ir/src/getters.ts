export const getFieldsFromPick = ({
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
}: any) => ({
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
}: any) => rest;

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
}: any) => ({
  date,
  team_1,
  team_2,
  event_id,
  rank_1,
  rank_2,
  map_wins_1,
  map_wins_2,
  match_winner,
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
}: any) => rest;
