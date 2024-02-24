using System.ComponentModel;

namespace API_Server.Models
{
    public class InvoiceDetail
    {
        public int Id { get; set; }

        // Reference navigation property cho khóa ngoại đến Invoice
        [DisplayName("Hóa đơn")]
        public int InvoiceId { get; set; }
        [DisplayName("Hóa đơn")]
        public Invoice Invoice { get; set; }


        // Reference navigation property cho khóa ngoại đến Product
        public int ProductId { get; set; }
        public Product Product { get; set; }

        public bool Status { get; set; }
        [DisplayName("Đơn giá")]
        public int UnitPrice { get; set; }
      
    }
}
