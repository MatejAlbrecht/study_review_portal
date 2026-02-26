import { useState } from "react";
import StarRatingInput from "./StarRatingInput";
import "./ReviewForm.css";

export default function ReviewForm({ onSubmit }) {
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(0);
  const [difficulty, setDifficulty] = useState(0);
  const [wouldTakeAgain, setWouldTakeAgain] = useState(null);
  const [semester, setSemester] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating || !difficulty || wouldTakeAgain === null) return;

    onSubmit({
      author: author || "Anonymous",
      rating,
      difficulty,
      wouldTakeAgain,
      semester,
      comment,
      date: new Date().toISOString().split("T")[0],
    });

    setAuthor("");
    setRating(0);
    setDifficulty(0);
    setWouldTakeAgain(null);
    setSemester("");
    setComment("");
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h3 className="review-form__title">Write a Review</h3>

      <div className="review-form__field">
        <label htmlFor="author">Your Name (optional)</label>
        <input
          id="author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Anonymous"
        />
      </div>

      <div className="review-form__row">
        <StarRatingInput label="Overall Rating *" value={rating} onChange={setRating} />
        <StarRatingInput label="Difficulty *" value={difficulty} onChange={setDifficulty} />
      </div>

      <div className="review-form__field">
        <label>Would you take this class again? *</label>
        <div className="review-form__toggle-group">
          <button
            type="button"
            className={`review-form__toggle ${wouldTakeAgain === true ? "review-form__toggle--active-yes" : ""}`}
            onClick={() => setWouldTakeAgain(true)}
          >
            Yes
          </button>
          <button
            type="button"
            className={`review-form__toggle ${wouldTakeAgain === false ? "review-form__toggle--active-no" : ""}`}
            onClick={() => setWouldTakeAgain(false)}
          >
            No
          </button>
        </div>
      </div>

      <div className="review-form__field">
        <label htmlFor="semester">Semester</label>
        <input
          id="semester"
          type="text"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          placeholder="e.g. Fall 2025"
        />
      </div>

      <div className="review-form__field">
        <label htmlFor="comment">Your Review</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience with this class..."
          rows={4}
        />
      </div>

      <button
        type="submit"
        className="review-form__submit"
        disabled={!rating || !difficulty || wouldTakeAgain === null}
      >
        Submit Review
      </button>
    </form>
  );
}
