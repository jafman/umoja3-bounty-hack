import bidImage from '../assets/image_bid.png'
import Header from './Header'
import { Link } from 'react-router-dom';

function Home() {
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
    </div>
  );
}

export default Home;

