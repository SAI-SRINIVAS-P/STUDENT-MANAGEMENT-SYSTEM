using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentManagement.Api.Data;
using StudentManagement.Api.Models;

namespace StudentManagement.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StudentsController : ControllerBase
{
    private readonly StudentDbContext _context;

    public StudentsController(StudentDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Student>>> GetStudents()
    {
        var students = await _context.Students
            .AsNoTracking()
            .OrderBy(student => student.Name)
            .ToListAsync();

        return Ok(students);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Student>> GetStudent(int id)
    {
        var student = await _context.Students.FindAsync(id);
        if (student is null)
            return NotFound(new { message = "Student not found." });

        return Ok(student);
    }

    [HttpPost]
    public async Task<ActionResult<Student>> CreateStudent(Student student)
    {
        student.Id = 0;
        _context.Students.Add(student);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetStudent), new { id = student.Id }, student);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateStudent(int id, Student updatedStudent)
    {
        if (id != updatedStudent.Id)
            return BadRequest(new { message = "The URL ID must match the student ID." });

        var student = await _context.Students.FindAsync(id);
        if (student is null)
            return NotFound(new { message = "Student not found." });

        student.Name = updatedStudent.Name;
        student.Email = updatedStudent.Email;
        student.Course = updatedStudent.Course;
        student.Age = updatedStudent.Age;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteStudent(int id)
    {
        var student = await _context.Students.FindAsync(id);
        if (student is null)
            return NotFound(new { message = "Student not found." });

        _context.Students.Remove(student);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
