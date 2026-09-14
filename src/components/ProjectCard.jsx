import { useState } from "react";
import { Link } from "react-router-dom";
import TechStack from "./TechStack";

export default function ProjectCard({ id, title, description, techStack, image, link }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <article>
      <h3>
        <a href={link} target="_blank" rel="noreferrer">{title}</a>
      </h3>

      {image && <img src={image} alt={`${title} screenshot`} className="project-image" />}

      <p>{description[0]}</p>

      {showDetails && description.length > 1 && (
        <ul className="project-details">
          {description.slice(1).map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      )}

      <TechStack stack={techStack} />

      <div className="project-actions">
        <button onClick={() => setShowDetails((prev) => !prev)}>
          {showDetails ? "Hide Details" : "View Details"}
        </button>
        <Link to={`/projects/${id}`}>Project Page</Link>
      </div>
    </article>
  );
}
