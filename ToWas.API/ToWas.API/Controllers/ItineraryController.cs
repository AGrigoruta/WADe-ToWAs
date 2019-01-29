using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using ToWas.API.Models;

namespace ToWas.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItineraryController : ControllerBase
    {
        [HttpGet]
        public ActionResult<IEnumerable<ItineraryModel>> Get()
        {
            return new List<ItineraryModel>();
        }

        [HttpGet("city/{cityName}")]
        public ActionResult<IEnumerable<ItineraryModel>> GetItineraryByCityName(string cityName)
        {
            return new List<ItineraryModel>();
        }

        [HttpPost("location")]
        public ActionResult<IEnumerable<ItineraryModel>> GetItineraryByCurrentLocation(
            [FromBody] LocationRequestModel location)
        {
            return new List<ItineraryModel>();
        }
    }
}