using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using ToWas.Rdf;

namespace ToWas.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private readonly SparqlExampleClass _example2;

        public ValuesController(SparqlExampleClass example2)
        {
            _example2 = example2;
        }
        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            //_example2.GetAllCitiesFromCountry2();

            _example2.GetAttractionsFromCity("Budapest");

            return new[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
