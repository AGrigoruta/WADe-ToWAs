using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ToWas.API.Models;
using ToWas.Rdf;

namespace ToWas.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItineraryController : ControllerBase
    {
        private readonly RecommendationService _recommendationService;

        public ItineraryController(RecommendationService recommendationService)
        {
            _recommendationService = recommendationService;
        }

        [HttpGet]
        public List<ItineraryModel> Get()
        {
            return new List<ItineraryModel>();
        }

        [HttpGet("city/{cityName}")]
        public ActionResult<ItineraryModel[]> GetItineraryByCityName(string cityName)
        {
            return new List<ItineraryModel>().ToArray();
        }

        [HttpPost("location")]
        public ActionResult<ItineraryModel[]> GetItineraryByCurrentLocation(
            [FromBody] LocationRequestModel location)
        {
            var pins = _recommendationService.GetPinsForCityName(location.CityName);

            return pins.Select(ItineraryModel.From).ToArray();
        }
    }
}