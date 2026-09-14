import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import TechStack from "../components/TechStack";

export default function ProjectDetail() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    async function loadProject() {
      try {
        const response = await fetch(`http://localhost:5000/api/projects/${projectId}`, { signal: controller.signal });
        if (response.status === 404) { setNotFound(true); return; }
        if (!response.ok) throw new Error("Unable to load this project. Please try again later.");
        setProject(await response.json());
      } catch (error) {
        if (error.name !== "AbortError") setError(error.message || "Unable to load this project. Please try again later.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    loadProject();
    return () => controller.abort();
  }, [projectId]);

  if (loading) return <section id="project-detail"><p>Loading project...</p></section>;

  if (notFound) {
    return (
      <section id="project-detail">
        <h2>Project Not Found</h2>
        <p>
          <Link to="/projects">Back to Projects</Link>
        </p>
      </section>
    );
  }

  if (error) {
    return <section id="project-detail"><h2>Unable to Load Project</h2><p className="form-error">{error}</p><p><Link to="/projects">Back to Projects</Link></p></section>;
  }

  const { title, description, techStack, image, link } = project;

  return (
    <section id="project-detail">
      <h2>{title}</h2>

      {image && <img src={image} alt={`${title} screenshot`} className="project-image" />}

      <ul className="project-details">
        {description.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>

      <TechStack stack={techStack} />

      <p>
        <a href={link} target="_blank" rel="noreferrer">View on GitHub</a>
      </p>
      <p>
        <Link to="/projects">Back to Projects</Link>
      </p>
    </section>
  );
}
