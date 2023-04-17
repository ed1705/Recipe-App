import { Link, useMatch, useResolvedPath } from "react-router-dom";

export default function Navbar() {
  // const path = window.location.pathname
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        Home
      </Link>
      <ul>
        <CustomLink to="/recipelist">My Own Recipes</CustomLink>
        <CustomLink to="/recipes">Recipes</CustomLink>
      </ul>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  //   const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <li>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
