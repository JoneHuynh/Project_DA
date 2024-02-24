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
    public class KindBooksController : ControllerBase
    {
        private readonly BookStoreIdentity_Context _context;

        public KindBooksController(BookStoreIdentity_Context context)
        {
            _context = context;
        }

        // GET: api/KindBooks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<KindBook>>> GetKindBooks()
        {
            return await _context.KindBooks.ToListAsync();
        }

        // GET: api/KindBooks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<KindBook>> GetKindBook(int id)
        {
            var kindBook = await _context.KindBooks.FindAsync(id);

            if (kindBook == null)
            {
                return NotFound();
            }

            return kindBook;
        }

        // PUT: api/KindBooks/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutKindBook(int id, KindBook kindBook)
        {
            if (id != kindBook.Id)
            {
                return BadRequest();
            }

            _context.Entry(kindBook).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!KindBookExists(id))
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

        // POST: api/KindBooks
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<KindBook>> PostKindBook(KindBook kindBook)
        {
            _context.KindBooks.Add(kindBook);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetKindBook", new { id = kindBook.Id }, kindBook);
        }

        // DELETE: api/KindBooks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteKindBook(int id)
        {
            var kindBook = await _context.KindBooks.FindAsync(id);
            if (kindBook == null)
            {
                return NotFound();
            }

            _context.KindBooks.Remove(kindBook);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool KindBookExists(int id)
        {
            return _context.KindBooks.Any(e => e.Id == id);
        }
    }
}
