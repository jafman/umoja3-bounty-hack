import coin from '../assets/coin.png'
import Header from './Header'
import Footer from './Footer';
import Campaign from './components/campaign';
import LazyLoadCampaign from './components/campaign_lazy';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getCampaigns } from '../utils/db';

function Home() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCampaigns().then(campaigns => {
      setCampaigns(campaigns);
      //console.log(campaigns);
      setLoading(false);
    });
  }, []);

  return (
    <div className="Landing">
      <Header/>
      <div className="top-wrapper">
        <div className="top-banner container">
          <div className='left'>
            <h2>
              Give or Get Contribution<br/>
              for a Project, Business, or Cause <br/>
              using Crypto Currency.
            </h2>
            <Link to="/campaign/new">
              <button type="button" className="btn btn-lg btn-success">Start a Campaign</button>
            </Link> 
          </div>
          <div className='right'>
            <img height='300px' src={coin} />
          </div>
        </div>
      </div>

      <div className="body container">
        <h4>Latest Campaigns</h4>
        <div className="row">

          { loading && 
            <>
            <LazyLoadCampaign/>
            <LazyLoadCampaign/>
            <LazyLoadCampaign/> 
            </>
          }

          { campaigns.map( (campaign) => (
            <Campaign key={campaign.id} id={campaign.id} title={campaign.title} donated={campaign.donated} total={campaign.amount}
            body={campaign.description} img_url={campaign.img_url} />
            ))
          }

        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Home;

