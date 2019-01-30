using System.Collections.Generic;
using System.Linq;
using ToWas.Rdf.Dtos;

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
    }
}
