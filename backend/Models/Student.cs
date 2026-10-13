using System.ComponentModel.DataAnnotations;

namespace StudentManagement.Api.Models;

public class Student
{
    public int Id { get; set; }

    [Required]
    [StringLength(80)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    [StringLength(120)]
    public string Email { get; set; } = string.Empty;

    [Required]
    [StringLength(80)]
    public string Course { get; set; } = string.Empty;

    [Range(1, 120)]
    public int Age { get; set; }
}
