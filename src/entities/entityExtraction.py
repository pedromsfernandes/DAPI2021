import csv

players = set()
teams = set()
maps = set()

with open('../../data/hltv/players.csv', encoding='utf-8') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = 0
    for row in csv_reader:
        if line_count == 0:
            print(f'Column names are {", ".join(row)}')
            line_count += 1
        else:
            players.add(row[1])
            teams.add(row[2])
            line_count += 1
    print(f'Processed {line_count} lines.')
    players_unique = list( dict.fromkeys(players) )
    teams_unique = list( dict.fromkeys(teams) )
    print(f'Number of players: {len(players_unique)}.')
    print(f'Number of teams: {len(teams_unique)}.')

with open('../../data/hltv/results.csv', encoding='utf-8') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = 0
    for row in csv_reader:
        if line_count == 0:
            print(f'Column names are {", ".join(row)}')
            line_count += 1
        else:
            maps.add(row[3])
            line_count += 1
    print(f'Processed {line_count} lines.')
    maps_unique = list( dict.fromkeys(maps) )
    print(f'Number of maps: {len(maps_unique)}.')
    print(f'Maps: {", ".join(maps_unique)}')

with open('../../data/results/players.csv', mode='w', newline="", encoding='utf-8') as csv_file:
    csv_writer = csv.writer(csv_file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
    for player in players_unique:
        if player:
            csv_writer.writerow([player])

with open('../../data/results/teams.csv', mode='w', newline="", encoding='utf-8') as csv_file:
    csv_writer = csv.writer(csv_file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
    for team in teams_unique:
        if team:
            csv_writer.writerow([team])

with open('../../data/results/maps.csv', mode='w', newline="", encoding='utf-8') as csv_file:
    csv_writer = csv.writer(csv_file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
    for map in maps_unique:
        if map:
            csv_writer.writerow([map])