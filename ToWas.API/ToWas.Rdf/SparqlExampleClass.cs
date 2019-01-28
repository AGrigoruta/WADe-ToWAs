using System;
using VDS.RDF;
using VDS.RDF.Query;

namespace ToWas.Rdf
{
    /// <summary>
    /// This example is about querying dbpedia and creating a graph with those results
    /// </summary>
    public class SparqlExampleClass
    {
        public void DoSomething()
        {
            //Define a remote endpoint
            //Use the DBPedia SPARQL endpoint with the default Graph set to DBPedia
            var endpoint = new SparqlRemoteEndpoint(new Uri("http://dbpedia.org/sparql"), "http://dbpedia.org");

            //Make a SELECT query against the Endpoint
            var results = endpoint.QueryWithResultSet("SELECT DISTINCT ?Concept WHERE {[] a ?Concept}");
            foreach (SparqlResult result in results)
            {
                Console.WriteLine(result.ToString());
            }
        }
    }
}
