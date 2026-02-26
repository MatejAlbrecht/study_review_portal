import { Link } from "react-router-dom";
import StarRating from "./StarRating";
import { getAverageRating, getAverageDifficulty, getReviewsForCourse } from "../data/mockData";
import "./CourseCard.css";

export default function CourseCard({ course }) {
  const avgRating = getAverageRating(course.id);
  const avgDifficulty = getAverageDifficulty(course.id);
  const reviewCount = getReviewsForCourse(course.id).length;

  return (
    <Link to={`/course/${course.id}`} className="course-card">
      <div className="course-card__header">
        <span className="course-card__code">{course.code}</span>
        <span className="course-card__credits">{course.credits} credits</span>
      </div>
      <h3 className="course-card__name">{course.name}</h3>
      <p className="course-card__professor">{course.professor}</p>
      <p className="course-card__department">{course.department}</p>
      <div className="course-card__stats">
        <div className="course-card__rating">
          <StarRating rating={avgRating} size="sm" />
          <span className="course-card__review-count">
            ({reviewCount} review{reviewCount !== 1 ? "s" : ""})
          </span>
        </div>
        <div className="course-card__difficulty">
          <span className="course-card__difficulty-label">Difficulty:</span>
          <span className="course-card__difficulty-value">{avgDifficulty.toFixed(1)}/5</span>
        </div>
      </div>
    </Link>
  );
}
