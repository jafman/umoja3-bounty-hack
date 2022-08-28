import { useParams } from "react-router-dom";
import { getCampaign } from '../utils/db';
import { useState, useEffect } from 'react';
import sneakers from '../assets/sneakers.webp';
import PriceTag from "./components/price-tag";
import BidState from "./components/bid-state";
import BidPlaced from "./components/bid-placed";

function BidInfo() {
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [percentage, setPercentage] = useState('0%');
  const [imgSrc, setImgSrc] = useState('');
  const params = useParams();
  const bidState = 'open';
  const [ bidPlaced, updateBidPlaced ] = useState(false);
  //const percentage = (Number(ca))+'%';
  //console.log('Cached Campaign:' + getCampaign(params.campaignId));
  useEffect(() => {
    getCampaign(params.itemId).then(campaign => {
      setCampaign(campaign);
      setLoading(false);
      //console.log(campaign);
      if(campaign !== null) {
        setPercentage((campaign.donated/campaign.amount)*100+'%');
        setImgSrc(campaign.img_url);
      }
    });
  }, []);
  
  return (
    <div className="body container campaign_body">
        { loading && 
          <div className="skeleton title"></div>
        }
        { campaign!==null &&  <h3>{campaign.title}</h3> }
        {campaign===null && !loading && <h3>Item Not Found!</h3>}
        <div className="row">

          <div className="col-sm-8">
            { loading && 
              <div className="skeleton bid-item-lg"></div>
            }
            { campaign!==null && 
              <div className="img-container" style={{"backgroundImage":`url(${sneakers})`}}></div>
            }

            { loading && 
              <>
                <div className="skeleton p1"></div>
                <div className="skeleton p2"></div>
              </>
            }

            <p>
              {campaign!==null && campaign.description}
            </p>
          </div>
          { campaign!==null && !bidPlaced &&
            <div className="col-sm-4">
              <div className="card bid shadow-sm padded-card">
                <div className="card-body">
                  <BidState state={bidState}></BidState>
                  <div className="mb-3"></div>
                  <div className="price-tags mb-5">
                    <PriceTag caption='Starting Bid' price='3'></PriceTag>
                    <PriceTag caption='Highest Bid' price='4'></PriceTag>
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

