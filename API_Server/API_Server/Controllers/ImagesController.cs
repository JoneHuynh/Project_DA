using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API_Server.Data;
using API_Server.Models;
using Microsoft.AspNetCore.Hosting;

namespace API_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private readonly BookStoreIdentity_Context _context;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public ImagesController(BookStoreIdentity_Context context, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            _webHostEnvironment = webHostEnvironment;
        }

        // GET: api/Images
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Image>>> GetImages()
        {
            return await _context.Images.Include(p =>p.Product  )
                                        .ToListAsync();
        }

        // GET: api/Images/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Image>> GetImage(int id)
        {
            var image = await _context.Images.FindAsync(id);

            if (image == null)
            {
                return NotFound();
            }

            return image;
        }

        // PUT: api/Images/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutImage(int id, [FromForm] Image image)
        {
            var findImageId = _context.Images.Find(id);
            if(image.ImageFile !=null && image.ImageFile.Length > 0)
            {
                var fileName = image.ImageFile.FileName;
                var imagePath = Path.Combine(_webHostEnvironment.WebRootPath, "Images", "products");
                var uploadFile = Path.Combine(imagePath, fileName);
                using (var fileStream = new FileStream(uploadFile, FileMode.Create))
                {
                    await image.ImageFile.CopyToAsync(fileStream);
                }
                findImageId.Path = fileName;
                _context.Images.Update(findImageId);
                await _context.SaveChangesAsync();
            }
            else
            {
                return NotFound();
            }

            return NoContent();
        }

        // POST: api/Images
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Image>> PostImage([FromForm]Image image)
        {
            if (image.ImageFile != null && image.ImageFile.Length > 0)
            {
                var fileName = image.ImageFile.FileName;
                var imagePath = Path.Combine(_webHostEnvironment.WebRootPath, "Images", "products");
                var uploadFile = Path.Combine(imagePath, fileName);
                using (var fileStream = new FileStream(uploadFile, FileMode.Create))
                {
                    await image.ImageFile.CopyToAsync(fileStream);
                }
                image.Path = fileName;
                _context.Images.Add(image);
                await _context.SaveChangesAsync();
            }
           
            return  Ok();
        }

        // DELETE: api/Images/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteImage(int id)
        {
            var image = await _context.Images.FindAsync(id);
            if (image == null)
            {
                return NotFound();
            }

            _context.Images.Remove(image);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ImageExists(int id)
        {
            return _context.Images.Any(e => e.Id == id);
        }
        [HttpGet("productId/{productId}")]
        public async Task<ActionResult<IEnumerable<Image>>> GetImagesByProductId(int productId)
        {
            var images = await _context.Images.Where(kb => kb.ProductId == productId).ToListAsync();

            if (images == null || images.Count == 0)
            {
                return NotFound();
            }

            return images;
        }
        [HttpGet("product/firstImage/{productId}")]
        public async Task<ActionResult<Image>> GetFirstImageProduct(int productId)
        {
            var images = await _context.Images.Include(i => i.Product).FirstOrDefaultAsync(kb => kb.ProductId == productId);

            if (images == null)
            {
                return NotFound();
            }

            return images;
        }
    }
}
