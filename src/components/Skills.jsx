const skillGroups = [
  { label: "Languages:", value: "C, C++, Java, GDScript, SQL" },
  { label: "Developer Tools:", value: "Docker, Git, GitHub, VS Code" },
  { label: "Interests:", value: "Systems, Operating Systems" },
  { label: "Soft Skills:", value: "Team Collaboration, Event Organization" },
];

export default function Skills() {
  return (
    <section id="skills">
      <h2>Technical Skills and Interests</h2>
      <ul className="skills-list">
        {skillGroups.map((group) => (
          <li key={group.label}>
            <span className="skill-label">{group.label}</span> {group.value}
          </li>
        ))}
      </ul>
    </section>
  );
}
