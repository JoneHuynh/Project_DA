namespace API_Server.Models
{
	public class BookCombo
	{
		public int Id { get; set; }


        public int ProductId { get; set; }
        public Product Products { get; set; }



		public int ComboId { get; set; }
		public Combo Combos { get; set; }
			

		


	}
}
