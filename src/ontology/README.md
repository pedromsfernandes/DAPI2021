# CS:GO Ontology

You can test the ontology by opening the `csgo-ontology-january-2020.owl` file in Protegé, since it has already been populated with a set of matches from January 2020. The `csgo-ontology.owl` does not have any entities, but everything else remains the same. The spreadsheet and transformation rules files are provided in order to test changes to the ontology after making changes, by populating with the Cellfie plugin.

Here's a sample SPARQL query:

```
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX  : <http://www.semanticweb.org/zephyrminas/ontologies/2020/11/csgo-ontology#>

SELECT distinct ?eventname
WHERE
{
	?team :name "Heroic".
	?match :event ?event.
	?event :name ?eventname
	{
		?match :team1 ?team
	}
	UNION
	{
		?match :team2 ?team
	}
}
```
