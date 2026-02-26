import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import StarRating from "../components/StarRating";
import ReviewCard from "../components/ReviewCard";
import ReviewForm from "../components/ReviewForm";
import { getCourse, getReviewsForCourse } from "../data/mockData";
import "./CoursePage.css";

export default function CoursePage() {
  const { id } = useParams();
  const course = getCourse(Number(id));
  const [localReviews, setLocalReviews] = useState(() =>
    getReviewsForCourse(Number(id))
  );

  if (!course) {
    return (
      <div className="course-page">
        <div className="course-page__not-found">
          <h2>Course not found</h2>
          <Link to="/">← Back to courses</Link>
        </div>
      </div>
    );
  }

  const avgRating = localReviews.length
    ? localReviews.reduce((sum, r) => sum + r.rating, 0) / localReviews.length
    : 0;
  const avgDifficulty = localReviews.length
    ? localReviews.reduce((sum, r) => sum + r.difficulty, 0) /
      localReviews.length
    : 0;
  const wouldTakeAgainPct = localReviews.length
    ? Math.round(
        (localReviews.filter((r) => r.wouldTakeAgain).length /
          localReviews.length) *
          100
      )
    : 0;

  const handleNewReview = (reviewData) => {
    const newReview = {
      ...reviewData,
      id: Date.now(),
      courseId: course.id,
    };
    setLocalReviews((prev) => [newReview, ...prev]);
  };

  return (
    <div className="course-page">
      <Link to="/" className="course-page__back">
        ← Back to courses
      </Link>

      <div className="course-page__header">
        <div className="course-page__info">
          <span className="course-page__code">{course.code}</span>
          <h1 className="course-page__name">{course.name}</h1>
          <p className="course-page__professor">{course.professor}</p>
          <p className="course-page__department">
            {course.department} · {course.credits} credits
          </p>
          <p className="course-page__description">{course.description}</p>
        </div>

        <div className="course-page__stats-panel">
          <div className="course-page__stat">
            <span className="course-page__stat-value">
              <StarRating rating={avgRating} size="lg" />
            </span>
            <span className="course-page__stat-label">Overall Rating</span>
          </div>
          <div className="course-page__stat">
            <span className="course-page__stat-value course-page__stat-number">
              {avgDifficulty.toFixed(1)}
            </span>
            <span className="course-page__stat-label">
              Difficulty (out of 5)
            </span>
          </div>
          <div className="course-page__stat">
            <span className="course-page__stat-value course-page__stat-number">
              {wouldTakeAgainPct}%
            </span>
            <span className="course-page__stat-label">Would Take Again</span>
          </div>
          <div className="course-page__stat">
            <span className="course-page__stat-value course-page__stat-number">
              {localReviews.length}
            </span>
            <span className="course-page__stat-label">Reviews</span>
          </div>
        </div>
      </div>

      <div className="course-page__content">
        <div className="course-page__reviews">
          <h2 className="course-page__section-title">
            Reviews ({localReviews.length})
          </h2>
          {localReviews.length === 0 ? (
            <p className="course-page__no-reviews">
              No reviews yet. Be the first to review!
            </p>
          ) : (
            <div className="course-page__review-list">
              {localReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          )}
        </div>

        <div className="course-page__form-section">
          <ReviewForm onSubmit={handleNewReview} />
        </div>
      </div>
    </div>
  );
}
