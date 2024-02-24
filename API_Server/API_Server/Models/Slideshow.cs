namespace API_Server.Models
{
    public class Slideshow
    {
        public int Id { get; set; }

        public string Title { get; set; }
        public string Path { get; set; }
        public string Image { get; set; }

		public int ProductId { get; set; }
		public Product Product { get; set; }
	}
}
