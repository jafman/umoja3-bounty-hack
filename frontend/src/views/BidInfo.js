import { useParams } from "react-router-dom";
import { getAuction } from '../utils/db';
import { useState, useEffect } from 'react';
import sneakers from '../assets/sneakers.webp';
import PriceTag from "./components/price-tag";
import BidState from "./components/bid-state";
import BidPlaced from "./components/bid-placed";

function BidInfo() {
  const [auction, setAuction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startingBid, setStartingBid] = useState('');
  const [highestBid, setHighestBid] = useState('');
  const [imgSrc, setImgSrc] = useState('');
  const params = useParams();
  const bidState = 'open';
  const [ bidPlaced, updateBidPlaced ] = useState(false);
  
  useEffect(() => {
    getAuction(params.itemId).then(auction => {
      setAuction(auction);
      setStartingBid(auction.amount);
      setHighestBid(auction.amount);
      setLoading(false);
      console.log(auction);
      if(auction !== null) {
        setImgSrc(auction.img_url);
      }
    });
  }, []);
  
  return (
    <div className="body container campaign_body">
        { loading && 
          <div className="skeleton title"></div>
        }
        { auction!==null &&  <h3>{auction.title}</h3> }
        {auction===null && !loading && <h3>Item Not Found!</h3>}
        <div className="row">

          <div className="col-sm-8">
            { loading && 
              <div className="skeleton bid-item-lg"></div>
            }
            { auction!==null && 
              <div className="img-container" style={{"backgroundImage":`url(${imgSrc})`}}></div>
            }

            { loading && 
              <>
                <div className="skeleton p1"></div>
                <div className="skeleton p2"></div>
              </>
            }

            <p>
              {auction!==null && auction.description}
            </p>
          </div>
          { auction!==null && !bidPlaced &&
            <div className="col-sm-4">
              <div className="card bid shadow-sm padded-card">
                <div className="card-body">
                  <BidState state={bidState}></BidState>
                  <div className="mb-3"></div>
                  <div className="price-tags mb-5">
                    <PriceTag caption='Starting Bid' price={startingBid}></PriceTag>
                    <PriceTag caption='Highest Bid' price={highestBid}></PriceTag>
                  </div>
                  
                  <input className="form-control mb-4" placeholder="Amount" type="number" />
                  <button className="btn btn-primary form-control" target="_blank" disabled={bidState==='closed'} >Place Bid</button>
                </div>
              </div>
            </div>
          }

          { !loading && bidPlaced &&
            <div className="col-sm-4">
              <BidPlaced state="new"></BidPlaced>
            </div>
          }

          {/* {
            !loading && bidPlaced && 
            <div className='blur'></div>
          } */}

          { loading &&
            <div className="col-sm-4">
              <div className="skeleton card"></div>
            </div>
          }
        </div>
    </div>
  );
}

export default BidInfo;

