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
        public float Latitude { get; set; }
        public float Longitude { get; set; }

        public static PinDto From(SparqlResult sparqlResult)
        {
            string graphUriAbsoluteUri = sparqlResult[0].AsValuedNode().AsString();
            string attractionTypeUrl = sparqlResult[1].AsValuedNode().AsString();
            string countryAbsoluteUri = sparqlResult[5].AsValuedNode().AsString();
            string attractionType = sparqlResult[2].AsValuedNode().AsString();
            float latitude = sparqlResult[4].AsValuedNode().AsFloat();
            float longitude = sparqlResult[3].AsValuedNode().AsFloat();

            return new PinDto
            {
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
