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
    public class InvoicesController : ControllerBase
    {
        private readonly BookStoreIdentity_Context _context;

        public InvoicesController(BookStoreIdentity_Context context)
        {
            _context = context;
        }

        // GET: api/Invoices
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Invoice>>> GetInvoices()
        {
            return await _context.Invoices.Include(u=>u.User).Include(m=>m.PayMethod)
                                            .ToListAsync();
        }

        // GET: api/Invoices/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Invoice>> GetInvoice(int id)
        {
            var invoice = await _context.Invoices.FindAsync(id);

            if (invoice == null)
            {
                return NotFound();
            }

            return invoice;
        }

        // PUT: api/Invoices/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutInvoice(int id, Invoice invoice)
        {
            if (id != invoice.Id)
            {
                return BadRequest();
            }

            _context.Entry(invoice).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InvoiceExists(id))
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

        [HttpGet("getInvoiceDetailById/{id}")]

        public async Task<IActionResult> getInvoiceDetailById(int id)

        {
            var invoiceDetail = _context.InvoiceDetails.Include(p=>p.Product)
                                                        .Include(i=>i.Invoice)
                                                       .Where( i=>i.InvoiceId==id);
            return Ok(invoiceDetail);
           

        }

        // PUT: api/Invoices/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("PutStatus/{id}")]
        
        public async Task<IActionResult>Getid(int id)
        {
            var invoice = _context.Invoices.Find(id);
            if(invoice!=null)
            {
                invoice.Status = true;
                _context.Update(invoice);
                _context.SaveChanges();
                return Ok(invoice);
            }
            else
            {
                return BadRequest();
            }
            
        }
        [HttpPut("PutStatusTrash/{id}")]

        public async Task<IActionResult> trashInvoice(int id)
        
        {
            var invoice = _context.Invoices.Find(id);
            if (invoice != null)
            {
                invoice.Status = false;
                _context.Update(invoice);
                _context.SaveChanges();
                return Ok(invoice);
            }
            else
            {
                return BadRequest();
            }

        }

        // POST: api/Invoices
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Invoice>> PostInvoice(Invoice invoice)
        {
            _context.Invoices.Add(invoice);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetInvoice", new { id = invoice.Id }, invoice);
        }

        // DELETE: api/Invoices/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInvoice(int id)
        {
            var invoice = await _context.Invoices.FindAsync(id);
            if (invoice == null)
            {
                return NotFound();
            }

            _context.Invoices.Remove(invoice);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool InvoiceExists(int id)
        {
            return _context.Invoices.Any(e => e.Id == id);
        }
    }
}
