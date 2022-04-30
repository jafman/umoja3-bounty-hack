import { Link } from 'react-router-dom';

function Header() {
  return (
      <nav className="navbar shadow">
        <div className="container-fluid">
          <Link to="/" id="logo" className="navbar-brand">
            W3FUND
          </Link>
          <ul>
            <li>How it works</li>
            <li>
              <Link to="/campaign/new"><button type="button" className="btn btn-success">Start a Campaign</button></Link>
            </li>
          </ul>
        </div>
      </nav>
      
  );
}

export default Header;

