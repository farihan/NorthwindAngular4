using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NorthwindAngular4.Data;
using Microsoft.EntityFrameworkCore;
using NorthwindAngular4.Models;
using System.Linq.Expressions;
using NorthwindAngular4.Extensions;

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
        public async Task<IActionResult> Get(string sortBy, bool isSortAscending)
        {
            var columnsMap = new Dictionary<string, Expression<Func<Products, object>>>()
            {
                ["productid"] = column => column.ProductId,
                ["productname"] = column => column.ProductName,
                ["quantityperunit"] = column => column.QuantityPerUnit,
                ["unitprice"] = column => column.UnitPrice,
                ["unitsinstock"] = column => column.UnitsInStock,
                ["unitsonorder"] = column => column.UnitsOnOrder,
                ["reorderlevel"] = column => column.ReorderLevel,
                ["discontinued"] = column => column.Discontinued,
            };

            var productModels = await context.Products.ApplyOrder<Products>(sortBy, columnsMap, isSortAscending).Select(x => new ProductModel
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
