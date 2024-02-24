using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API_Server.Data;
using API_Server.Models;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.AspNetCore.Hosting;
using System.Data;

namespace API_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly BookStoreIdentity_Context _context;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public ProductsController(BookStoreIdentity_Context context, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            _webHostEnvironment = webHostEnvironment;
        }
        // GET: api/Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            return await _context.Products.Include(a => a.ProductType)
                                          .Include(a => a.Covertype)
                                          .Include(a => a.Publisher)
                                          .Include(a=>a.KindBook)
                                            .ToListAsync();
        }

        [HttpGet("GetProductsByProductType")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProductByProductType(int ProductTypeId)
        {
            var product = await _context.Products.Where(pm => pm.ProductTypeId == ProductTypeId).ToListAsync();
            if (product == null)
            {
                return NotFound();
            }
            return product;

        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.Include(a => a.ProductType)
                                          .Include(a => a.Covertype)
                                          .Include(a => a.Publisher).FirstOrDefaultAsync(a => a.Id == id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }
        //sửa sản phẩm  
        // PUT: api/Products/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, [FromForm] Product product)
        {

            var productFind = _context.Products.Find(id);
            if (productFind != null)
            {
                if (product.CoverimageFile != null && product.CoverimageFile.Length > 0)
                {
                    var fileName = product.CoverimageFile.FileName;
                    var imagePath = Path.Combine(_webHostEnvironment.WebRootPath, "Images", "products");
                    var uploadFile = Path.Combine(imagePath, fileName);
                    using (var fileStream = new FileStream(uploadFile, FileMode.Create))
                    {
                        await product.CoverimageFile.CopyToAsync(fileStream);
                    }
                    
                    productFind.Coverimage = fileName;
                }
                else
                {
                    var datenow = DateTime.Now;
                    productFind.Date = datenow;
                    productFind.SKU = product.SKU;
                    productFind.KindBookId = product.KindBookId;
                    productFind.Name = product.Name;
                    productFind.Price = product.Price;
                    productFind.Size = product.Size;
                    productFind.NumberPages = product.NumberPages;
                    productFind.Coverimage = product.Coverimage;          
                    productFind.Stock = product.Stock;
                    productFind.Status = product.Status;
                    productFind.ProductType = product.ProductType;
                    productFind.Author = product.Author;
                    productFind.Description = product.Description;
                }
               
              
                _context.Products.Update(productFind);
                await _context.SaveChangesAsync();
            }
           

            return Ok();

        }
        //thêm sản phẩm
        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct([FromForm] Product product)
        {

            if (product.CoverimageFile != null && product.CoverimageFile.Length > 0)
            {
                var fileName = product.CoverimageFile.FileName;
                var imagePath = Path.Combine(_webHostEnvironment.WebRootPath, "Images", "products");
                var uploadFile = Path.Combine(imagePath, fileName);
                using (var fileStream = new FileStream(uploadFile, FileMode.Create))
                {
                    await product.CoverimageFile.CopyToAsync(fileStream);
                }
                var datenow = DateTime.Now;
                product.Date = datenow;

                product.Coverimage = fileName;
                _context.Products.Add(product);
                await _context.SaveChangesAsync();
            }
            return Ok();
        }


        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductExists(int id)
        {
            return _context.Products.Any(e => e.Id == id);
        }
    }
}
