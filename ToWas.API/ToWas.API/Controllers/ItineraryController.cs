using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ToWas.API.Models;
using ToWas.Rdf;
using ToWas.Rdf.Dtos;

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
            List<PinDto> pins;
            try
            {
                pins = _recommendationService.GetPinsForCityName(cityName);
            }
            catch (Exception)
            {
                return NotFound();
            }

            return pins.Select(ItineraryModel.From).ToArray();
        }

        [HttpPost("location")]
        public ActionResult<ItineraryModel[]> GetItineraryByCurrentLocation(
            [FromBody] LocationRequestModel location)
        {
            List<PinDto> pins;
            try
            {
                pins = _recommendationService.GetPinsForUserPreferences(new UserPreferencesDto
                {
                    CityName = location.CityName,
                    Age = location.Age,
                    IsCultural = location.IsCultural,
                    IsInterestedInAccomodation = location.IsInterestedInAccomodation,
                    IsInterestedInSports = location.IsInterestedInSports,
                    TripType = location.TripType
                });
            }
            catch (Exception e)
            {
                return NotFound();
            }

            return pins.Select(ItineraryModel.From).ToArray();
        }
    }
}