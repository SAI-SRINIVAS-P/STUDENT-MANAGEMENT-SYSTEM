
import React, { useCallback, useEffect, useMemo, useState } from "react";

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"
).replace(/\/$/, "");

const EMPTY_FORM = {
  name: "",
  email: "",
  course: "",
  age: "",
};

export default function App({ onLogout }) {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  // Load students from the .NET API
  const loadStudents = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/students`);

      if (!response.ok) {
        throw new Error(`Could not load students (${response.status}).`);
      }

      setStudents(await response.json());
    } catch (err) {
      setError(
        `${err.message} Check that the .NET API is running and VITE_API_BASE_URL is correct.`
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  // Search students by name, email, or course
  const filteredStudents = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return students;

    return students.filter((student) =>
      [student.name, student.email, student.course].some((value) =>
        value.toLowerCase().includes(query)
      )
    );
  }, [students, search]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function resetForm() {
    setForm(EMPTY_FORM);
    setEditingId(null);
  }

  // Add a new student or update an existing student
  async function handleSubmit(event) {
    event.preventDefault();

    setSaving(true);
    setError("");
    setNotice("");

    const payload = {
      ...(editingId !== null ? { id: editingId } : {}),
      name: form.name.trim(),
      email: form.email.trim(),
      course: form.course.trim(),
      age: Number(form.age),
    };

    try {
      const response = await fetch(
        editingId === null
          ? `${API_BASE_URL}/api/students`
          : `${API_BASE_URL}/api/students/${editingId}`,
        {
          method: editingId === null ? "POST" : "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const body = await response.json().catch(() => null);

        const validationMessage = body?.errors
          ? Object.values(body.errors).flat().join(" ")
          : body?.message;

        throw new Error(
          validationMessage || `Save failed (${response.status}).`
        );
      }

      setNotice(
        editingId === null
          ? "Student added successfully."
          : "Student updated successfully."
      );

      resetForm();
      await loadStudents();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  // Fill the form when editing a student
  function startEdit(student) {
    setEditingId(student.id);

    setForm({
      name: student.name,
      email: student.email,
      course: student.course,
      age: String(student.age),
    });

    setError("");
    setNotice("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // Delete a student
  async function deleteStudent(student) {
    if (!window.confirm(`Delete ${student.name}? This cannot be undone.`)) {
      return;
    }

    setError("");
    setNotice("");

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/students/${student.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`Delete failed (${response.status}).`);
      }

      if (editingId === student.id) {
        resetForm();
      }

      setNotice("Student deleted.");
      await loadStudents();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="page">
      <header className="hero">
        <div className="hero-icon" aria-hidden="true">
          🎓
        </div>

        <div>
          <p className="eyebrow">STUDENT PORTAL</p>
          <h1>Student Management</h1>
          <p className="subtitle">
            Keep student records organized in one place.
          </p>
        </div>

        <div className="total-card">
          <span>Total students</span>
          <strong>{students.length}</strong>
        </div>

        {/* Logout button */}
        <button
          type="button"
          className="logout-button"
          onClick={onLogout}
        >
          Log out
        </button>
      </header>

      {error && (
        <div className="alert error" role="alert">
          {error}
        </div>
      )}

      {notice && (
        <div className="alert success" role="status">
          {notice}
        </div>
      )}

      {/* Add or edit student form */}
      <section className="panel form-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              {editingId === null ? "NEW RECORD" : "UPDATE RECORD"}
            </p>
            <h2>
              {editingId === null ? "Add a student" : "Edit student"}
            </h2>
          </div>

          {editingId !== null && (
            <button
              className="button secondary"
              type="button"
              onClick={resetForm}
            >
              Cancel edit
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <label>
              Full name
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Asha Kumar"
                maxLength="80"
                required
              />
            </label>

            <label>
              Email address
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="asha@example.com"
                maxLength="120"
                required
              />
            </label>

            <label>
              Course
              <input
                name="course"
                value={form.course}
                onChange={handleChange}
                placeholder="e.g. Computer Science"
                maxLength="80"
                required
              />
            </label>

            <label>
              Age
              <input
                name="age"
                type="number"
                min="1"
                max="120"
                value={form.age}
                onChange={handleChange}
                placeholder="e.g. 20"
                required
              />
            </label>
          </div>

          <div className="form-actions">
            <button
              className="button primary"
              type="submit"
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : editingId === null
                  ? "+ Add student"
                  : "Save changes"}
            </button>

            {editingId === null && (
              <button
                className="button secondary"
                type="button"
                onClick={resetForm}
              >
                Clear
              </button>
            )}
          </div>
        </form>
      </section>

      {/* Student directory */}
      <section className="panel list-panel">
        <div className="section-heading list-heading">
          <div>
            <p className="eyebrow">DIRECTORY</p>
            <h2>
              Student records{" "}
              <span className="count">{filteredStudents.length}</span>
            </h2>
          </div>

          <label className="search-box">
            <span className="sr-only">Search students</span>
            <span aria-hidden="true">⌕</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search name, email, course..."
            />
          </label>
        </div>

        {loading ? (
          <p className="empty-state">Loading student records...</p>
        ) : filteredStudents.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">📚</span>
            <strong>
              {search ? "No matching students" : "No students yet"}
            </strong>
            <p>
              {search
                ? "Try a different search term."
                : "Add your first student using the form above."}
            </p>
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Email</th>
                  <th>Course</th>
                  <th>Age</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td>
                      <div className="student-cell">
                        <span className="avatar">
                          {student.name.trim().charAt(0).toUpperCase()}
                        </span>

                        <span>
                          <strong>{student.name}</strong>
                          <small>ID #{student.id}</small>
                        </span>
                      </div>
                    </td>

                    <td>{student.email}</td>

                    <td>
                      <span className="course-pill">
                        {student.course}
                      </span>
                    </td>

                    <td>{student.age}</td>

                    <td>
                      <div className="row-actions">
                        <button
                          className="button small secondary"
                          type="button"
                          onClick={() => startEdit(student)}
                        >
                          Edit
                        </button>

                        <button
                          className="button small danger"
                          type="button"
                          onClick={() => deleteStudent(student)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <footer>
        Student Management System
        <span>·</span>
      </footer>
    </main>
  );
}
