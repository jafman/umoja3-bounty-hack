import hammer from '../assets/hammer.png';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import { loadStdlib } from '@reach-sh/stdlib';
import { ALGO_MyAlgoConnect as MyAlgoConnect } from '@reach-sh/stdlib';

const reach = loadStdlib('ALGO');
reach.setWalletFallback(reach.walletFallback( { providerEnv: 'TestNet', MyAlgoConnect } ));

function Login() {
  const [ account, setAccount ] = useState({});
  const [ address, setAddress ] = useState('');

  const connetWallet = async () => {
    try {
      const accountObj = await reach.getDefaultAccount();
      console.log('ACCOUNT IS:', reach.formatAddress(accountObj))
      setAccount(accountObj);
      setAddress(reach.formatAddress(accountObj))
    } catch (e) {
      alert('Error getting account:', e)
    }
    
  }

  // useEffect(() => {
  // }, []);

  return (
    <div className="landing">
      <div className='circle circle-sm circle-login-left'></div>
      <div className='circle circle-login-top'></div>
      <div className='logo-login'>
        <Link to="/" >
          <img src={logo} alt={'logo'} width={150} />
        </Link>
      </div>

      <div className='login-modal shadow'>
        <img className='block hammer' src={hammer} width={60} />
        <span className='block welcome'>Welcome Back.</span>
        <button type="button" className="btn btn-lg btn-success block" onClick={connetWallet} style={ {"marginTop": "20px"} }>
          Connect Wallet
        </button>
      </div>

      <div style={ {"textAlign": "center", "marginTop": "10px"} }>{address}</div>
       
    </div>
  );
}

export default Login;

