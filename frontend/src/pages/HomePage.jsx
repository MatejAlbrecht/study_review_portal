import { useState } from "react";
import CourseCard from "../components/CourseCard";
import { courses, getDepartments } from "../data/mockData";
import "./HomePage.css";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const departments = getDepartments();

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      !search ||
      course.name.toLowerCase().includes(search.toLowerCase()) ||
      course.code.toLowerCase().includes(search.toLowerCase()) ||
      course.professor.toLowerCase().includes(search.toLowerCase());

    const matchesDept =
      department === "All" || course.department === department;

    return matchesSearch && matchesDept;
  });

  return (
    <div className="home-page">
      <div className="home-page__hero">
        <h1 className="home-page__title">Find &amp; Review College Classes</h1>
        <p className="home-page__subtitle">
          Read honest reviews from students to help you choose the right courses
        </p>
      </div>

      <div className="home-page__filters">
        <input
          type="text"
          className="home-page__search"
          placeholder="Search by course name, code, or professor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="home-page__department-filter"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value="All">All Departments</option>
          {departments.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      {filteredCourses.length === 0 ? (
        <div className="home-page__empty">
          <p>No courses found matching your search.</p>
        </div>
      ) : (
        <div className="home-page__grid">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}
