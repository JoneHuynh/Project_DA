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
    public class BookComboesController : ControllerBase
    {
        private readonly BookStoreIdentity_Context _context;

        public BookComboesController(BookStoreIdentity_Context context)
        {
            _context = context;
        }

        // GET: api/BookComboes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookCombo>>> GetBookCombos()
        {
            return await _context.BookCombos.ToListAsync();
        }

        // GET: api/BookComboes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BookCombo>> GetBookCombo(int id)
        {
            var bookCombo = await _context.BookCombos.FindAsync(id);

            if (bookCombo == null)
            {
                return NotFound();
            }

            return bookCombo;
        }

        // PUT: api/BookComboes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBookCombo(int id, BookCombo bookCombo)
        {
            if (id != bookCombo.Id)
            {
                return BadRequest();
            }

            _context.Entry(bookCombo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookComboExists(id))
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

        // POST: api/BookComboes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<BookCombo>> PostBookCombo(BookCombo bookCombo)
        {
            _context.BookCombos.Add(bookCombo);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBookCombo", new { id = bookCombo.Id }, bookCombo);
        }

        // DELETE: api/BookComboes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBookCombo(int id)
        {
            var bookCombo = await _context.BookCombos.FindAsync(id);
            if (bookCombo == null)
            {
                return NotFound();
            }

            _context.BookCombos.Remove(bookCombo);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BookComboExists(int id)
        {
            return _context.BookCombos.Any(e => e.Id == id);
        }
    }
}
