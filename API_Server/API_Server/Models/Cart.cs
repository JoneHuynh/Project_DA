using System.ComponentModel;
using System.Security.Principal;

namespace API_Server.Models
{
    public class Cart
    {
        public int Id { get; set; }

        [DisplayName("Khách hàng")]
        public string UserId { get; set; }

        [DisplayName("Khách hàng")]
        public User User { get; set; }

        public int? ProductId { get; set; }
        public Product Product { get; set; }

        public int KindBookId { get; set; }
        public KindBook KindBook { get; set; }

        [DisplayName("Số lượng")]
        public int Quantity { get; set; }


        public bool Status { get; set; }
    }
}
