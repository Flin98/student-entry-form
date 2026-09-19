import React, { useState } from "react";
import "./App.css";

const GRADES = [
  { value: "1", label: "Class 1" },
  { value: "2", label: "Class 2" },
  { value: "3", label: "Class 3" },
  { value: "4", label: "Class 4" },
  { value: "5", label: "Class 5" },
  { value: "6", label: "Class 6" },
  { value: "7", label: "Class 7" },
  { value: "8", label: "Class 8" },
  { value: "9", label: "Class 9" },
  { value: "10", label: "Class 10" },
  { value: "11", label: "Class 11" },
  { value: "12", label: "Class 12" },
];

export default function App() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    grade: "",
  });

  const [students, setStudents] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.age.trim() || !formData.grade) {
      return;
    }

    const selectedGrade = GRADES.find((g) => g.value === formData.grade);

    setStudents((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: formData.name,
        age: formData.age,
        gradeValue: formData.grade,
        gradeLabel: selectedGrade ? selectedGrade.label : `Class ${formData.grade}`,
      },
    ]);

    setFormData({
      name: "",
      age: "",
      grade: "",
    });
  };

  const handleClear = () => {
    setFormData({
      name: "",
      age: "",
      grade: "",
    });
  };

  const handleRemove = (id) => {
    setStudents((prev) => {
      const updated = prev.filter((student) => student.id !== id);
      return updated;
    });
  };

  return (
    <div className="page-wrapper">
      <div className="card">
        <h1 className="title">Student Entry Form</h1>
        <p className="subtitle">Add students and review the list below.</p>

        <form onSubmit={handleAddStudent}>
          <div className="form-grid">
            <div className="field-group">
              <label htmlFor="student-name">Name</label>
              <input
                id="student-name"
                type="text"
                name="name"
                placeholder="e.g. MS Dhoni"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="field-group">
              <label htmlFor="student-age">Age</label>
              <input
                id="student-age"
                type="number"
                name="age"
                placeholder="e.g. 14"
                value={formData.age}
                onChange={handleChange}
              />
            </div>

            <div className="field-group">
              <label htmlFor="student-grade">Grade</label>
              <select
                id="student-grade"
                name="grade"
                value={formData.grade}
                onChange={handleChange}
              >
                <option value="">Select grade</option>
                {GRADES.map((grade) => (
                  <option key={grade.value} value={grade.value}>
                    {grade.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="btn-row">
            <button type="submit" className="btn btn-primary">
              Add Student
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClear}
            >
              Clear
            </button>
          </div>
        </form>

        <div className="list-section">
          {students.length === 0 ? (
            <div className="empty-box">No students added yet.</div>
          ) : (
            <div className="table-wrapper">
              <table className="student-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Grade</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td>{student.name}</td>
                      <td>{student.age}</td>
                      <td>{student.gradeLabel}</td>
                      <td className="action-col">
                        <button
                          type="button"
                          className="btn-remove"
                          onClick={() => handleRemove(student.id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}