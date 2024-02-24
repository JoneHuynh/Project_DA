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
    public class CoverTypesController : ControllerBase
    {
        private readonly BookStoreIdentity_Context _context;

        public CoverTypesController(BookStoreIdentity_Context context)
        {
            _context = context;
        }

        // GET: api/CoverTypes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CoverType>>> GetCoverType()
        {
            return await _context.CoverType.ToListAsync();
        }

        // GET: api/CoverTypes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CoverType>> GetCoverType(int id)
        {
            var coverType = await _context.CoverType.FindAsync(id);

            if (coverType == null)
            {
                return NotFound();
            }

            return coverType;
        }

        // PUT: api/CoverTypes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCoverType(int id, CoverType coverType)
        {
            if (id != coverType.Id)
            {
                return BadRequest();
            }

            _context.Entry(coverType).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CoverTypeExists(id))
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

        // POST: api/CoverTypes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CoverType>> PostCoverType(CoverType coverType)
          {
            _context.CoverType.Add(coverType);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCoverType", new { id = coverType.Id }, coverType);
        }

        // DELETE: api/CoverTypes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCoverType(int id)
        {
            var coverType = await _context.CoverType.FindAsync(id);
            if (coverType == null)
            {
                return NotFound();
            }

            _context.CoverType.Remove(coverType);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CoverTypeExists(int id)
        {
            return _context.CoverType.Any(e => e.Id == id);
        }
    }
}
