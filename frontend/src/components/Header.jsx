import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/" className="header__logo">
          <span className="header__logo-icon">📚</span>
          <span className="header__logo-text">StudyReview</span>
        </Link>
        <nav className="header__nav">
          <Link to="/" className="header__link">
            Browse Courses
          </Link>
        </nav>
      </div>
    </header>
  );
}
