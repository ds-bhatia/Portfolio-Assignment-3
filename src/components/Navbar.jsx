import { NavLink } from "react-router-dom";

export default function Navbar({ theme, toggleTheme }) {
  const linkClass = ({ isActive }) => (isActive ? "active" : undefined);

  return (
    <header>
      <nav>
        <ul>
          <li>
            <NavLink to="/home" className={linkClass}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/about" className={linkClass}>About</NavLink>
          </li>
          <li>
            <NavLink to="/projects" className={linkClass}>Projects</NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={linkClass}>Contact</NavLink>
          </li>
        </ul>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle dark and light theme"
        >
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </nav>
    </header>
  );
}
