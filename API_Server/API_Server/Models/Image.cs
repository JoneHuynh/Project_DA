using System.ComponentModel.DataAnnotations.Schema;

namespace API_Server.Models
{
	public class Image
	{
		public int Id { get; set; }

	
        public string Path { get; set; }
        [NotMapped]
        public IFormFile ImageFile { get; set; }

        public int ProductId { get; set; }
        // Reference navigation property cho khóa ngoại đến Product
        public Product Product { get; set; }
		public bool Status { get; set; }

			

	}
}
