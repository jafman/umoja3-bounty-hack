import { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'
import { AccountContext } from '../context/account-context';

function Header(props) {
  let navClass = 'navbar' ;
  const { address } = useContext(AccountContext);
  const addressStr = address.substring(0,10) + '...';
  

  return (
      <nav className={navClass}>
        <div className="container">
          <Link to="/auctions" id="logo" className="navbar-brand">
            <img src={logo} alt={'logo'} width={120} />
          </Link>
        {
          props.showLinks === true && 

          <ul>
            <li>Account: {addressStr}</li>
            <li>
              <Link to="/auction/new"><button type="button" className="btn btn-primary">Auction an item</button></Link>
            </li>
          </ul>

        }
        </div>
      </nav>
      
  );
}

export default Header;

