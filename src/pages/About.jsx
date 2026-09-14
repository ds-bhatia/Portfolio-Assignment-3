import Skills from "../components/Skills";

export default function About() {
  return (
    <>
      <section id="about">
        <h2>About Me</h2>
        <div className="about-layout">
          <img
            src="/src/assets/image.jpg"
            alt="Portrait of Dhruv Sunil Bhatia"
            className="profile-photo"
          />
          <p>
            Greetings! I am a 3rd year CSE Undergraduate at NIT Warangal, currently exploring
            Game Development and Systems Development.
          </p>
        </div>
      </section>

      <Skills />

      <section id="experience">
        <h2>Positions of Responsibility</h2>
        <article>
          <h3>Executive Member - Computer Science and Engineering Society</h3>
          <p className="date">Sept. 2025 - Present</p>
          <ul>
            <li>
              Led planning and execution of Noobathon VI hackathon (200+ participants),
              coordinating logistics, judging, and problem statements
            </li>
            <li>
              Contributed to Development Team projects, demonstrating strong problem-solving
              and development skills
            </li>
            <li>
              Worked with the PR team to promote workshops and events, increasing student
              engagement by 30%
            </li>
          </ul>
        </article>
      </section>

      <section id="achievements">
        <h2>Achievements</h2>
        <article>
          <h3>F1 in Schools UAE National Finals - Top 10 National Finish</h3>
          <p className="date">Jun. 2023</p>
          <ul>
            <li>Designed and optimized a miniature F1 car using CFD aerodynamic analysis</li>
            <li>
              Collaborated with multidisciplinary team of six members on design,
              manufacturing, branding and race strategy
            </li>
          </ul>
        </article>
        <article>
          <h3>Curtin University Dubai Hackathon - Finalist</h3>
          <p className="date">Feb. 2023</p>
        </article>
      </section>
    </>
  );
}
