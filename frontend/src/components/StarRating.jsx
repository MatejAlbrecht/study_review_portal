import "./StarRating.css";

export default function StarRating({ rating, max = 5, size = "md" }) {
  const stars = [];
  for (let i = 1; i <= max; i++) {
    if (i <= Math.floor(rating)) {
      stars.push("full");
    } else if (i - rating < 1 && i - rating > 0) {
      stars.push("half");
    } else {
      stars.push("empty");
    }
  }

  return (
    <span className={`star-rating star-rating--${size}`} aria-label={`${rating} out of ${max} stars`}>
      {stars.map((type, i) => (
        <span key={i} className={`star star--${type}`}>
          ★
        </span>
      ))}
      <span className="star-rating__value">{rating.toFixed(1)}</span>
    </span>
  );
}
