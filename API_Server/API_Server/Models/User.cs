using Microsoft.AspNetCore.Identity;
using System.Text.Json.Serialization;

namespace API_Server.Models
{
	public class User:IdentityUser
	{
        public string Name { get; set; }
		public string FullName { get; set; }

		public DateTime Birthday { get; set; }

        // Collection navigation property cho khóa ngoại từ Cart
        [JsonIgnore]
        public List<Cart> Carts { get; set; }
	}
}
