# IR 

## Usage

1. Generate JSON file with nested documents

```bash
$ npm run start-mem -- -f ../../data/files
```

2. POST to solr

```bash
$ cd <solr_path>
$ ./bin/solr start
$ ./bin/solr create -c csgo
$ ./bin/post -c csgo -format solr <json_path>
```

3. Check schema. `text_general` should not have `multiValued=true`, and field with name `nest_path` should be commented out.

4. Test query

```bash
# Return matches where NiP was team_1, along with the maps played.
$ curl http://localhost:8983/solr/csgo/query -d 'q=team_1:NiP&fl=id,_map,[parentFilter=content_type:match child childFilter=content_type:map]'
```