import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section id="not-found">
      <h2>404 - Page Not Found</h2>
      <p>The page you're looking for doesn't exist.</p>
      <p>
        <Link to="/home">Back to Home</Link>
      </p>
    </section>
  );
}
