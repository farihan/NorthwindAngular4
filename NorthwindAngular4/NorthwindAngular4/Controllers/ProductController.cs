using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NorthwindAngular4.Data;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace NorthwindAngular4.Controllers
{
    [Route("api/[controller]")]
    public class ProductController : Controller
    {
        private readonly NorthwindContext context;

        public ProductController(NorthwindContext context)
        {
            this.context = context;
        }

        // GET: api/values
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var products = await context.Products.ToListAsync();

            return Ok(products);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var product = await context.Products.FirstOrDefaultAsync(x => x.ProductId == id);

            return Ok(product);
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
