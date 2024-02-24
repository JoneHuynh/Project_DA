namespace API_Server.Models
{
    public class Vote
    {
        public int Id { get; set; }

        public string UserId { get; set; }
        public User Users { get; set; }

        public double StarNumber { get; set; }


        public int ProductId { get; set; }
        public Product Products { get; set; }

        public bool Status { get; set; }

     
    }
}
