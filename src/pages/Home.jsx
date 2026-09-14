import { useState, useEffect } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <section id="intro" className="loading-state">
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section id="intro">
      <h1>Welcome to My Portfolio!</h1>
    </section>
  );
}
