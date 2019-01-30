using System;
using VDS.RDF.Query;

namespace ToWas.Rdf
{
    /// <summary>
    /// This example is about querying dbpedia and creating a graph with those results
    /// </summary>
    public class SparqlExampleClass
    {
        private readonly SparqlRemoteEndpoint _wikiDataEndpoint;
        private readonly SparqlRemoteEndpoint _dbPediaEndpoint;

        public SparqlExampleClass()
        {
            _wikiDataEndpoint = new SparqlRemoteEndpoint(new Uri("https://query.wikidata.org/sparql"), "https://query.wikidata.org");
            _dbPediaEndpoint = new SparqlRemoteEndpoint(new Uri("http://dbpedia.org/sparql"), "http://dbpedia.org");
        }

        public void GetAllCitiesFromCountry2()
        {
            //Define a remote endpoint

            //Make a SELECT query against the Endpoint
            var results = _dbPediaEndpoint.QueryWithResultSet(
                "PREFIX dbr:    <http://dbpedia.org/resource/>\r\nPREFIX dbo:    <http://dbpedia.org/ontology/>\r\nPREFIX dct:    <http://purl.org/dc/terms/>\r\nPREFIX owl:    <http://www.w3.org/2002/07/owl#>\r\nPREFIX prov:   <http://www.w3.org/ns/prov#>\r\nPREFIX qb:     <http://purl.org/linked-data/cube#>\r\nPREFIX qudt:   <http://qudt.org/1.1/schema/qudt#>\r\nPREFIX rdf:    <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\r\nPREFIX rdfs:   <http://www.w3.org/2000/01/rdf-schema#>\r\nPREFIX schema: <http://schema.org/>\r\nPREFIX skos:   <http://www.w3.org/2004/02/skos/core#>\r\nPREFIX unit:   <http://qudt.org/vocab/unit#>\r\nPREFIX xsd:    <http://www.w3.org/2001/XMLSchema#>\r\nPREFIX sdmx:   <http://purl.org/linked-data/sdmx#>\r\n\r\nSELECT DISTINCT ?placeName WHERE {\r\n ?placeName a yago:City108524735 ; dbo:country dbr:Croatia\r\n}");


        }

        public void GetAllCitiesFromCountry()
        {
            //Make a SELECT query against the Endpoint
            var results = _wikiDataEndpoint.QueryWithResultSet("SELECT DISTINCT ?city ?cityLabel ?country ?countryLabel ?loc WHERE {\r\n?city wdt:P17 wd:Q33 .\r\n\t?city wdt:P31/wdt:P279* wd:Q515 .\r\n\t?city wdt:P17 ?country .\r\n\t?city wdt:P625 ?loc .\r\n\tSERVICE wikibase:label {\r\n\t\tbd:serviceParam wikibase:language \"en\" .\r\n\t}\r\n}");


        }

        public SparqlResultSet GetAttractionsFromCity(string cityToBeSearched)
        {
            return _dbPediaEndpoint.QueryWithResultSet(
                "select ?thing ?abs ?type ?typeName ?long ?lat ?country where {\r\n\r\nVALUES ?city {<http://dbpedia.org/resource/" +
                cityToBeSearched +
                ">}\r\n\r\noptional {\r\n?city dbo:country ?country\r\n}\r\n\r\n?thing dbo:location ?city. optional \r\n{\r\n?thing a ?type .\r\nVALUES ?type {<http://dbpedia.org/ontology/Hotel>}\r\nBIND( \"Hotel\" as ?typeName )\r\n}\r\n optional\r\n{\r\n?thing a ?type.\r\nVALUES ?type {dbo:Museum}\r\nBIND( \"Museum\" as ?typeName )\r\n}\r\noptional\r\n{\r\n?thing a ?type.\r\nVALUES ?type {dbo:Pyramid}\r\nBIND( \"Pyramid\" as ?typeName )\r\n} optional\r\n{\r\n?thing a ?type.\r\nVALUES ?type {yago:Skyscraper104233124}\r\nBIND( \"Skyscraper\" as ?typeName )\r\n}\r\n\r\noptional\r\n{\r\n?thing a ?type.\r\nVALUES ?type {dbo:Park}\r\nBIND( \"Park\" as ?typeName )\r\n}\r\n optional\r\n{\r\n?thing a ?type.\r\nVALUES ?type {yago:Church103028079}\r\nBIND( \"Church\" as ?typeName )\r\n}\r\n\r\noptional\r\n{\r\n?thing geo:long ?long.\r\n?thing geo:lat ?lat\r\n} ?thing dbo:abstract ?abs {\r\n?thing a dbo:Place\r\n}\r\n\r\nfilter (BOUND (?type)) \n filter (LANG(?abs) = \"en\") \r\n\r\n} LIMIT 100");
                
        }
    }
}