using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NorthwindAngular4.Data;
using Microsoft.EntityFrameworkCore;
using NorthwindAngular4.Models;

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
            var productModels = await context.Products.Select(x => new ProductModel
                {
                    ProductId = x.ProductId,
                    ProductName = x.ProductName,
                    SupplierId = x.SupplierId,
                    CategoryId = x.CategoryId,
                    QuantityPerUnit = x.QuantityPerUnit,
                    UnitPrice = x.UnitPrice,
                    UnitsInStock = x.UnitsInStock,
                    UnitsOnOrder = x.UnitsOnOrder,
                    ReorderLevel = x.ReorderLevel,
                    Discontinued = x.Discontinued
                })
                .ToListAsync();

            return Ok(productModels);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var productModel = await context.Products
            .FirstOrDefaultAsync(x => x.ProductId == id);

            return Ok(productModel);
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
