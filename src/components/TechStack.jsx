export default function TechStack({ stack }) {
  if (!stack || stack.length === 0) return null;

  return (
    <ul className="tech-stack">
      {stack.map((tech) => (
        <li key={tech}>{tech}</li>
      ))}
    </ul>
  );
}
