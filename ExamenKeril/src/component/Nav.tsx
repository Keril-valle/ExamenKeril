import { Link } from "@tanstack/react-router"

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
            <Link to="/">Home</Link>
        </li>
        <li>
            <Link to="/Cars">CarsParts</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
