using API_Server.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API_Server.Data
{
	public class BookStoreIdentity_Context: IdentityDbContext<User>
	{
		public BookStoreIdentity_Context(DbContextOptions<BookStoreIdentity_Context> options) : base(options) 
		{ }

		public DbSet<Favourite> Favourites { get; set; }
		public DbSet<Cart> Carts { get; set; }
		public DbSet<BookCombo> BookCombos { get; set; }
		public DbSet<Comment> Comments { get; set; }
		public DbSet<Image> Images { get; set; }
		public DbSet<Combo> Combos { get; set; }
		public DbSet<PayMethod> PayMethods { get; set; }
		public DbSet<Publisher> Publishers { get; set; }
		public DbSet<Slideshow> Slideshows { get; set; }
		public DbSet<Invoice> Invoices { get; set; }

		public DbSet<InvoiceDetail> InvoiceDetails { get; set; }

		public DbSet<Product> Products { get; set; }
		public DbSet<Vote> Votes { get; set; }

		public DbSet<ProductType> ProductTypes { get; set; }

		public DbSet<KindBook> KindBooks { get; set; }

		public DbSet<API_Server.Models.CoverType> CoverType { get; set; }

	}
}
