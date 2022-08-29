import bidImage from '../assets/image_bid.png'
import Header from './Header'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAuctions } from '../utils/db';
import { loadStdlib } from '@reach-sh/stdlib';
import { ALGO_MyAlgoConnect as MyAlgoConnect } from '@reach-sh/stdlib';

// const reach = loadStdlib('ALGO');
// reach.setWalletFallback(reach.walletFallback( { providerEnv: 'TestNet', MyAlgoConnect } ));

function Home() {
  // const [auctions, setAuctions] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [ account, setAccount ] = useState({});
  // const [ address, setAddress ] = useState('');

  // const getAcc = async () => {
  //   try {
  //     const accountObj = await reach.getDefaultAccount();
  //     console.log('ACCOUNT IS:', reach.formatAddress(accountObj))
  //     setAccount(accountObj);
  //     setAddress(reach.formatAddress(accountObj))
  //   } catch (e) {
  //     alert('Error getting account:', e)
  //   }
    
  // }

  // const showAcc = () => {
  //   console.log('ACCUNT:', reach.formatAddress(account));
  //   alert('ACC ADD:' + address);
  // }

  

  return (
    <div className="landing">
      <Header/>
      <div className='circle circle-lg circle-home'></div>
      <div className="top-wrapper">
        <div className="top-banner container">
          <div className='left'>
            <h2>
              That thing you treasure<br/>
              is just one bid away.
            </h2>
            <h5>Buy and sell valuable items at good rates.</h5>
            <Link to="/login" >
              <button type="button" className="btn btn-lg btn-primary" style={ {"marginTop": "50px"} }>Get Started</button>
            </Link> 
          </div>
          <div className='home right'>
            <img height='550px' src={bidImage} />
          </div>
        </div>
      </div>
       

          {/* { campaigns.map( (campaign) => (
            <Campaign key={campaign.id} id={campaign.id} title={campaign.title} donated={campaign.donated} total={campaign.amount}
            body={campaign.description} img_url={campaign.img_url} />
            ))
          } */}

      
    </div>
  );
}

export default Home;

