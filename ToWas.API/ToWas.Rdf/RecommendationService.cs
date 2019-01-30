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
            var result = new List<PinDto>();

            if (requestModel.IsInterestedInAccomodation == "stay_yes")
            {
                var aux = queryResult.Where(x => x[2].AsValuedNode().AsString() == "http://dbpedia.org/ontology/Hotel").Take(3);
                foreach (var i in aux)
                {
                    result.Add(PinDto.From(i));
                }
            }

            if (requestModel.IsInterestedInSports == "sport_yes")
            {
                var aux = queryResult.Where(x => x[2].AsValuedNode().AsString() == "http://dbpedia.org/ontology/Park")
                    .Take(3);
                foreach (var i in aux)
                {
                    result.Add(PinDto.From(i));
                }
            }

            if (requestModel.IsCultural == "cultural_yes")
            {
                var aux = queryResult.Where(x => x[2].AsValuedNode().AsString() == "http://dbpedia.org/ontology/Museum")
                    .Take(3);
                foreach (var i in aux)
                {
                    result.Add(PinDto.From(i));
                }
            }

            if (requestModel.IsReligious == "religious_yes")
            {
                var aux = queryResult.Where(x => x[2].AsValuedNode().AsString() == "http://dbpedia.org/ontology/Church")
                    .Take(3);
                foreach (var i in aux)
                {
                    result.Add(PinDto.From(i));
                }
            }

            if ((requestModel.IsInterestedInAccomodation == ""
                 && requestModel.IsCultural == ""
                 && requestModel.IsInterestedInSports == ""
                 && requestModel.IsReligious == "") ||
                (requestModel.IsInterestedInAccomodation == null &&
                requestModel.IsCultural == null &&
                requestModel.IsInterestedInSports == null &&
                requestModel.IsReligious == null))
            {
                var aux = queryResult.Take(5);

                return aux.Select(PinDto.From).ToList();
            }

            return result;
        }
    }
}
