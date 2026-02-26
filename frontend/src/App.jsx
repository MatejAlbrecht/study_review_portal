import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import CoursePage from "./pages/CoursePage";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/course/:id" element={<CoursePage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
