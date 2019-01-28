using System;
using VDS.RDF;
using VDS.RDF.Writing;

namespace ToWas.Rdf
{
    /// <summary>
    /// This is an example about creating a graph using dotnetRdf
    /// </summary>
    public class ExampleRdfClass
    {
        public void DoSomething()
        {
            IGraph g = new Graph();

            var dotNetRdf = g.CreateUriNode(UriFactory.Create("http://www.dotnetrdf.org"));
            var says = g.CreateUriNode(UriFactory.Create("http://example.org/says"));
            var helloWorld = g.CreateLiteralNode("Hello World");
            var bonjourMonde = g.CreateLiteralNode("Bonjour tout le Monde", "fr");

            g.Assert(new Triple(dotNetRdf, says, helloWorld));
            g.Assert(new Triple(dotNetRdf, says, bonjourMonde));

            foreach (Triple t in g.Triples)
            {
                Console.WriteLine(t.ToString());
            }

            var ntwriter = new NTriplesWriter();
            ntwriter.Save(g, "HelloWorld.nt");

            var rdfxmlwriter = new RdfXmlWriter();
            rdfxmlwriter.Save(g, "HelloWorld.rdf");
        }
    }
}
