import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'

function Header(props) {
  let navClass = 'navbar' ;
  

  return (
      <nav className={navClass}>
        <div className="container">
          <Link to="/" id="logo" className="navbar-brand">
            <img src={logo} alt={'logo'} width={120} />
          </Link>
        {
          props.showLinks === true && 

          <ul>
            <li><Link to="/">How it works</Link></li>
            <li><Link to="/">Logout</Link></li>
            <li>
              <Link to="/campaign/new"><button type="button" className="btn btn-success">Auction an item</button></Link>
            </li>
          </ul>

        }
        </div>
      </nav>
      
  );
}

export default Header;

