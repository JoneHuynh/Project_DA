namespace API_Server.Models
{
    public class Invoice
    {
        public int Id { get; set; }

        public string Code { get; set; }

        public DateTime IssuedDate { get; set; }
        
        public string ShippingAddress { get; set; }
        public int ShippingPhone { get; set;}
        public double Total { get; set; }
        public string UserId { get; set; }
        // Reference navigation property cho khóa ngoại đến User
        public User User { get; set; }


		public int PayMethodId { get; set; }
		public PayMethod PayMethod { get; set; }

        public bool Status { get; set; }

       
    }
}
