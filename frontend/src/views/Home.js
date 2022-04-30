import coin from '../assets/coin.png'
import Header from './Header'
import Footer from './Footer';
import Campaign from './components/campaign';
function Home() {
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
            <button type="button" className="btn btn-lg btn-success">Start a Campaign</button>
          </div>
          <div className='right'>
            <img height='300px' src={coin} />
          </div>
        </div>
      </div>

      <div className="body container">
        <h4>Latest Campaigns</h4>
        <div className="row">
          <Campaign title="Campaign One" donated="10" total="50"
            body="Some quick example text to build on the card title and make up the bulk of the card's content" />
          <Campaign title="Campaign One" donated="230" total="500"
            body="Some quick example text to build on the card title and make up the bulk of the card's content" />
          <Campaign title="Campaign One" donated="90" total="150"
            body="Some quick example text to build on the card title and make up the bulk of the card's content" />
          <Campaign title="Campaign One" donated="2" total="10"
            body="Some quick example text to build on the card title and make up the bulk of the card's content" />
          <Campaign title="Campaign One" donated="120" total="100"
            body="Some quick example text to build on the card title and make up the bulk of the card's content" />
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Home;

