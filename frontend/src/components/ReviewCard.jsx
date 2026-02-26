import StarRating from "./StarRating";
import "./ReviewCard.css";

export default function ReviewCard({ review }) {
  const formattedDate = new Date(review.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="review-card">
      <div className="review-card__header">
        <div className="review-card__author-info">
          <span className="review-card__author">{review.author}</span>
          <span className="review-card__date">{formattedDate}</span>
        </div>
        <StarRating rating={review.rating} size="sm" />
      </div>
      <p className="review-card__comment">{review.comment}</p>
      <div className="review-card__meta">
        <span className="review-card__tag">
          Difficulty: <strong>{review.difficulty}/5</strong>
        </span>
        <span className={`review-card__tag ${review.wouldTakeAgain ? "review-card__tag--positive" : "review-card__tag--negative"}`}>
          {review.wouldTakeAgain ? "Would take again ✓" : "Would not take again ✗"}
        </span>
        <span className="review-card__tag">{review.semester}</span>
      </div>
    </div>
  );
}
