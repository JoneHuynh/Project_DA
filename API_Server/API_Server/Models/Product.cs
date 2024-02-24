using System.ComponentModel.DataAnnotations.Schema;

namespace API_Server.Models
{
	public class Product
	{
		public int Id { get; set; }

		public string SKU { get; set; }

		public string Name { get; set; }

		public string Description { get; set; }

		public int Price { get; set; }

        public DateTime Date { get; set; }

        public string Size { get; set; }

        public int CoverTypeId { get; set; }
        public CoverType Covertype { get; set; }

        public int ProductTypeId { get; set; }
		public ProductType ProductType { get; set; }

        public int KindBookId { get; set; }
        public KindBook KindBook { get; set; }

        public int PublisherId { get; set; }
		public Publisher Publisher { get; set; }
        public string Coverimage { get; set; }
        [NotMapped]
        public IFormFile CoverimageFile { get; set; }
   
        public int NumberPages { get; set; }

        public string Path { get; set; }

        public int Stock { get; set; }

		public string Author { get; set; }


        public bool Status { get; set; }
		
	}
}
