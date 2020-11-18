interface Player {
  date: string;
  player_name: string;
  team: string;
  opponent: string;
  country: string;
  player_id: number;
  match_id: number;
  event_id: number;
  event_name: string;
  best_of: number;
  map_1: string;
  map_2: string;
  map_3: string;
  kills: number;
  assists: number;
  deaths: number;
  hs: number;
  flash_assists: number;
  kast: number;
  kddiff: number;
  adr: number;
  fkdiff: number;
  rating: number;
  m1_kills: number;
  m1_assists: number;
  m1_deaths: number;
  m1_hs: number;
  m1_flash_assists: number;
  m1_kast: number;
  m1_kddiff: number;
  m1_adr: number;
  m1_fkdiff: number;
  m1_rating: number;
  m2_kills: number;
  m2_assists: number;
  m2_deaths: number;
  m2_hs: number;
  m2_flash_assists: number;
  m2_kast: number;
  m2_kddiff: number;
  m2_adr: number;
  m2_fkdiff: number;
  m2_rating: number;
  m3_kills: number;
  m3_assists: number;
  m3_deaths: number;
  m3_hs: number;
  m3_flash_assists: number;
  m3_kast: number;
  m3_kddiff: number;
  m3_adr: number;
  m3_fkdiff: number;
  m3_rating: number;
  kills_ct: number;
  deaths_ct: number;
  kddiff_ct: number;
  adr_ct: number;
  kast_ct: number;
  rating_ct: number;
  kills_t: number;
  deaths_t: number;
  kddiff_t: number;
  adr_t: number;
  kast_t: number;
  rating_t: number;
  m1_kills_ct: number;
  m1_deaths_ct: number;
  m1_kddiff_ct: number;
  m1_adr_ct: number;
  m1_kast_ct: number;
  m1_rating_ct: number;
  m1_kills_t: number;
  m1_deaths_t: number;
  m1_kddiff_t: number;
  m1_adr_t: number;
  m1_kast_t: number;
  m1_rating_t: number;
  m2_kills_ct: number;
  m2_deaths_ct: number;
  m2_kddiff_ct: number;
  m2_adr_ct: number;
  m2_kast_ct: number;
  m2_rating_ct: number;
  m2_kills_t: number;
  m2_deaths_t: number;
  m2_kddiff_t: number;
  m2_adr_t: number;
  m2_kast_t: number;
  m2_rating_t: number;
  m3_kills_ct: number;
  m3_deaths_ct: number;
  m3_kddiff_ct: number;
  m3_adr_ct: number;
  m3_kast_ct: number;
  m3_rating_ct: number;
  m3_kills_t: number;
  m3_deaths_t: number;
  m3_kddiff_t: number;
  m3_adr_t: number;
  m3_kast_t: number;
  m3_rating_t: number;
}

interface Result {
  date: string;
  team_1: string;
  team_2: string;
  _map: string;
  result_1: number;
  result_2: number;
  map_winner: number;
  starting_ct: number;
  ct_1: number;
  t_2: number;
  t_1: number;
  ct_2: number;
  event_id: number;
  match_id: number;
  rank_1: number;
  rank_2: number;
  map_wins_1: number;
  map_wins_2: number;
  match_winner: number;
}

interface Pick {
  date: string;
  team_1: string;
  team_2: string;
  match_id: number;
  event_id: number;
  best_of: number;
  system: string;
  t1_removed_1: string;
  t1_removed_2: string;
  t1_removed_3: string;
  t2_removed_1: string;
  t2_removed_2: string;
  t2_removed_3: string;
  t1_picked_1: string;
  t2_picked_1: string;
}

interface Article {
  ID: number;
  date: string;
  match_id: number;
  title: string;
  text: string;
  author: string;
}

interface Match {
  _childDocuments_: (Partial<Player> | Partial<Result> | Partial<Pick>)[];
  article: string;
  id: number;
  date: string;
  team_1: string;
  team_2: string;
  event_id: number;
  rank_1: number;
  rank_2: number;
  map_wins_1: number;
  map_wins_2: number;
  match_winner: number;
  content_type: string;
}

type PicksMap = {
  [k: string]: Pick;
};
type NewsMap = {
  [k: string]: Article;
};

export { Player, Article, Result, Pick, PicksMap, NewsMap, Match };
