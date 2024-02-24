using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;

namespace API_Server.Models
{
	public class Comment
	{
		public int Id { get; set; }

		public string Content { get; set; }



		public string UserId { get; set; }
		// Reference navigation property cho khóa ngoại đến User
		public User User { get; set; }

        public int? ParentCommentId { get; set; }

        [ForeignKey("ParentCommentId")]
        public Comment ParentComment { get; set; }

        public DateTime DateComment { get; set; }

		public bool Status { get; set; }
		
	}
}
