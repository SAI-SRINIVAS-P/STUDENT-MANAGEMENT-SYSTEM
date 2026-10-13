using Microsoft.EntityFrameworkCore;
using StudentManagement.Api.Models;

namespace StudentManagement.Api.Data;

public class StudentDbContext : DbContext
{
    public StudentDbContext(DbContextOptions<StudentDbContext> options) : base(options)
    {
    }

    public DbSet<Student> Students => Set<Student>();
}
