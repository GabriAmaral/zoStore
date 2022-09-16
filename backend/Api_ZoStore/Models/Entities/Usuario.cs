using System.ComponentModel.DataAnnotations;

namespace Api_ZoStore.Models.Entities
{
    public class Usuario
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Discord { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public int Access { get; set; }

    }
}
