import { useContext } from 'react';
import hammer from '../assets/hammer.png';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import Header from './Header';
import BidItem from './components/Item';
import Footer from './Footer';
import sneakers from '../assets/sneakers.webp'

function Auctions() {

  // useEffect(() => {
  // }, []);

  return (
    <div className="landing-auction">
      <Header showLinks={true}></Header>
      <div className='circle circle-auctions-right'></div>

      <div className='container hero shadow'>
        <h1 className='light'>Awesome Deals</h1>
        <img src={hammer} width={100} />
      </div>

      <div className='row container bid-tems m-auto mt-5'>
        <BidItem imgSrc={sneakers} available={true}></BidItem>
        <BidItem imgSrc={sneakers} available={true}></BidItem>
        <BidItem imgSrc={sneakers} available={true}></BidItem>
        <BidItem imgSrc={sneakers} available={false}></BidItem>
        <BidItem imgSrc={sneakers} available={true}></BidItem>
        <BidItem imgSrc={sneakers} available={false}></BidItem>
      </div>

      <Footer></Footer>
    </div>
  );
}

export default Auctions;

