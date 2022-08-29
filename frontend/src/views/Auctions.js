import { useContext } from 'react';
import hammer from '../assets/hammer.png';
import Header from './Header';
import BidItem from './components/Item';
import Footer from './Footer';
import { getAuctions } from '../utils/db';
import { useState, useEffect } from 'react';

function Auctions() {

  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAuctions().then(auctions => {
      setAuctions(auctions);
      setLoading(false);
    });
  }, []);

  return (
    <div className="landing-auction">
      <Header showLinks={true}></Header>
      <div className='circle circle-auctions-right'></div>

      <div className='container hero shadow'>
        <h1 className='light'>Awesome Deals</h1>
        <img src={hammer} width={100} />
      </div>
      
      <div className='row container bid-tems m-auto mt-5'>
        {/* <BidItem imgSrc={sneakers} available={true}></BidItem>
        <BidItem imgSrc={sneakers} available={true}></BidItem>
        <BidItem imgSrc={sneakers} available={true}></BidItem>
        <BidItem imgSrc={sneakers} available={false}></BidItem>
        <BidItem imgSrc={sneakers} available={true}></BidItem>
        <BidItem imgSrc={sneakers} available={false}></BidItem> */}
        {
          auctions.map( (auction) => (
            <BidItem key={auction.id} auction={auction} available={true}></BidItem>
          ))
        }
        { loading &&
           
            <div className="skeleton bid-item col-sm-4"></div>
           
        }
      </div>

      <Footer></Footer>
    </div>
  );
}

export default Auctions;

