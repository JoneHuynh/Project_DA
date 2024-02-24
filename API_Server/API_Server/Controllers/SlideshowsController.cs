using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API_Server.Data;
using API_Server.Models;

namespace API_Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SlideshowsController : ControllerBase
    {
        private readonly BookStoreIdentity_Context _context;

        public SlideshowsController(BookStoreIdentity_Context context)
        {
            _context = context;
        }

        // GET: api/Slideshows
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Slideshow>>> GetSlideshows()
        {
            return await _context.Slideshows.ToListAsync();
        }

        // GET: api/Slideshows/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Slideshow>> GetSlideshow(int id)
        {
            var slideshow = await _context.Slideshows.FindAsync(id);

            if (slideshow == null)
            {
                return NotFound();
            }

            return slideshow;
        }

        // PUT: api/Slideshows/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSlideshow(int id, Slideshow slideshow)
        {
            if (id != slideshow.Id)
            {
                return BadRequest();
            }

            _context.Entry(slideshow).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SlideshowExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Slideshows
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Slideshow>> PostSlideshow(Slideshow slideshow)
        {
            _context.Slideshows.Add(slideshow);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSlideshow", new { id = slideshow.Id }, slideshow);
        }

        // DELETE: api/Slideshows/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSlideshow(int id)
        {
            var slideshow = await _context.Slideshows.FindAsync(id);
            if (slideshow == null)
            {
                return NotFound();
            }

            _context.Slideshows.Remove(slideshow);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SlideshowExists(int id)
        {
            return _context.Slideshows.Any(e => e.Id == id);
        }
    }
}
