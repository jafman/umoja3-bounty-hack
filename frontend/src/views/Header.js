
function Header() {
  return (
      <nav className="navbar shadow">
        <div className="container-fluid">
          <a id="logo" className="navbar-brand" href="#">
            W3FUND
          </a>
          <ul>
            <li>How it works</li>
            <li>Sign in</li>
            <li><button type="button" className="btn btn-success">Start a Campaign</button></li>
          </ul>
        </div>
      </nav>
      
  );
}

export default Header;

