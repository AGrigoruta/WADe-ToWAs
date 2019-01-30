using System.Collections.Generic;
using System.Linq;
using ToWas.Rdf.Dtos;
using VDS.Common.Collections.Enumerations;
using VDS.RDF.Nodes;
using VDS.RDF.Query;

namespace ToWas.Rdf
{
    public class RecommendationService
    {
        private readonly SparqlExampleClass _rdfQueryEngine;

        public RecommendationService(SparqlExampleClass rdfQueryEngine)
        {
            _rdfQueryEngine = rdfQueryEngine;
        }

        public List<PinDto> GetPinsForCityName(string cityName)
        {
            var result = _rdfQueryEngine.GetAttractionsFromCity(cityName);

            return result.Select(PinDto.From).ToList();
        }

        public List<PinDto> GetPinsForUserPreferences(UserPreferencesDto requestModel)
        {
            var queryResult = _rdfQueryEngine.GetAttractionsFromCity(requestModel.CityName);
            var result = new SparqlResultSet();

            if (requestModel.IsInterestedInAccomodation == "stay_yes")
            {
                var aux = queryResult.Where(x => x[2].AsValuedNode().AsString() == "http://dbpedia.org/ontology/Hotel").Take(3);
                foreach (var i in aux)
                {
                    result.AddIfMissing(i);
                }
            }

            if (requestModel.IsInterestedInAccomodation == "sport_yes")
            {
                var aux = queryResult.Where(x => x[2].AsValuedNode().AsString() == "http://dbpedia.org/ontology/Park")
                    .Take(3);
                foreach (var i in aux)
                {
                    result.AddIfMissing(i);
                }
            }

            if (requestModel.IsInterestedInAccomodation == "cultural_no")
            {
                var aux = queryResult.Where(x => x[2].AsValuedNode().AsString() == "http://dbpedia.org/ontology/Museum")
                    .Take(3);
                foreach (var i in aux)
                {
                    result.AddIfMissing(i);
                }
            }

            if (requestModel.IsInterestedInAccomodation == "religious_no")
            {
                var aux = queryResult.Where(x => x[2].AsValuedNode().AsString() == "http://dbpedia.org/ontology/Church")
                    .Take(3);
                foreach (var i in aux)
                {
                    result.AddIfMissing(i);
                }
            }

            return queryResult.Select(PinDto.From).ToList();
        }
    }
}
