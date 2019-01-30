using VDS.RDF.Nodes;
using VDS.RDF.Query;

namespace ToWas.Rdf.Dtos
{
    public class PinDto
    {
        public string Description { get; set; }
        public string DescriptionUrl { get; set; }
        public string AttractionType { get; set; }
        public string AttractionTypeUrl { get; set; }
        public string Country { get; set; }
        public string Abstract { get; set; }
        public float Latitude { get; set; }
        public float Longitude { get; set; }

        public static PinDto From(SparqlResult sparqlResult)
        {
            string graphUriAbsoluteUri = sparqlResult[0].AsValuedNode().AsString();
            string abstractDescription = sparqlResult[1].AsValuedNode().AsString();
            string attractionTypeUrl = sparqlResult[2].AsValuedNode().AsString();
            string countryAbsoluteUri = sparqlResult[6].AsValuedNode().AsString();
            string attractionType = sparqlResult[2].AsValuedNode().AsString();
            float latitude = sparqlResult[5].AsValuedNode() != null? sparqlResult[5].AsValuedNode().AsFloat() : 0;
            float longitude = sparqlResult[4].AsValuedNode() != null ? sparqlResult[4].AsValuedNode().AsFloat() : 0;
            string description = graphUriAbsoluteUri.Remove(0,"http://dbpedia.org/resource/".Length);

            return new PinDto
            {
                Description = description,
                Abstract = abstractDescription,
                DescriptionUrl = graphUriAbsoluteUri,
                AttractionTypeUrl = attractionTypeUrl,
                AttractionType = attractionType,
                Country = countryAbsoluteUri,
                Latitude = latitude,
                Longitude = longitude
            };
        }
    }
}
