import { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    async function loadProjects() {
      try {
        const response = await fetch("http://localhost:5000/api/projects", { signal: controller.signal });
        if (!response.ok) throw new Error("Unable to load projects. Please try again later.");
        setProjects(await response.json());
      } catch (error) {
        if (error.name !== "AbortError") setError(error.message || "Unable to load projects. Please try again later.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    loadProjects();
    return () => controller.abort();
  }, []);

  return (
    <section id="projects">
      <h2>Projects</h2>
      {loading && <p>Loading projects...</p>}
      {error && <p className="form-error">{error}</p>}
      {projects.map((project) => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </section>
  );
}
