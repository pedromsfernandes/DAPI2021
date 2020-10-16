import spacy
from spacy.matcher import PhraseMatcher
from spacy.tokens import Span
import csv

players = set()
teams = set()
maps = set()

news = set()

tags = set()

with open('../../data/results/players.csv', encoding='utf-8') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    for row in csv_reader:
        players.add(row[0])

with open('../../data/results/teams.csv', encoding='utf-8') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    for row in csv_reader:
        teams.add(row[0])

with open('../../data/results/maps.csv', encoding='utf-8') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    for row in csv_reader:
        maps.add(row[0])

print(f'Number of players: {len(players)}.')
print(f'Number of teams: {len(teams)}.')
print(f'Number of maps: {len(maps)}.')

nlp = spacy.load('en_core_web_sm')  

playerMatcher = PhraseMatcher(nlp.vocab)
playerPattern = [nlp(player) for player in players]
playerMatcher.add('PLAYER', None, *playerPattern)

print(f'Processed PLAYER entities.')

teamMatcher = PhraseMatcher(nlp.vocab)
teamPattern = [nlp(team) for team in teams]
teamMatcher.add('TEAM', None, *teamPattern)

print(f'Processed TEAM entities.')

mapMatcher = PhraseMatcher(nlp.vocab)
mapPattern = [nlp(map) for map in maps]
mapMatcher.add('MAP', None, *mapPattern)

print(f'Processed MAP entities.')

with open('../../data/news.csv', encoding='utf-8') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    for row in csv_reader:
        news.add(tuple([row[0], row[3]]))

print(f'Number of news: {len(news)}.')

for article in news:
    doc = nlp(article[1])
    matches = playerMatcher(doc)
    doc.ents = []
    for match_id, start, end in matches:
        span = Span(doc, start, end, label=match_id)
        tags.add(tuple([article[0], span, 'PLAYER']))
        # doc.ents = list(doc.ents) + [span]
        # [tags.add(tuple([article[0], ent.text, ent.label_])) for ent in doc.ents]
    matches = teamMatcher(doc)
    doc.ents = []
    for match_id, start, end in matches:
        span = Span(doc, start, end, label=match_id)
        tags.add(tuple([article[0], span, 'TEAM']))
        # doc.ents = list(doc.ents) + [span]
        # [tags.add(tuple([article[0], ent.text, ent.label_])) for ent in doc.ents]
    matches = mapMatcher(doc)
    doc.ents = []
    for match_id, start, end in matches:
        span = Span(doc, start, end, label=match_id)
        tags.add(tuple([article[0], span, 'MAP']))
        # doc.ents = list(doc.ents) + [span]
        # [tags.add(tuple([article[0], ent.text, ent.label_])) for ent in doc.ents]
    print(f'Processed article {article[0]}.')

with open('../../data/results/newsTag.csv', mode='w', newline="", encoding='utf-8') as csv_file:
    csv_writer = csv.writer(csv_file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
    for tag in tags:
        if tag:
            csv_writer.writerow(tag)

print(f'newsTag.csv created.')