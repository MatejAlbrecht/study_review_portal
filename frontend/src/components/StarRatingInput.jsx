import "./StarRatingInput.css";

export default function StarRatingInput({ value, onChange, label, max = 5 }) {
  return (
    <div className="star-rating-input">
      {label && <label className="star-rating-input__label">{label}</label>}
      <div className="star-rating-input__stars">
        {Array.from({ length: max }, (_, i) => i + 1).map((star) => (
          <button
            key={star}
            type="button"
            className={`star-rating-input__star ${star <= value ? "star-rating-input__star--active" : ""}`}
            onClick={() => onChange(star)}
            aria-label={`${star} star${star !== 1 ? "s" : ""}`}
          >
            ★
          </button>
        ))}
      </div>
    </div>
  );
}
