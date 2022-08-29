import {loadStdlib} from '@reach-sh/stdlib';
import { useParams } from "react-router-dom";
import { getAuction } from '../utils/db';
import { useState, useEffect, useContext, useRef } from 'react';
import PriceTag from "./components/price-tag";
import BidState from "./components/bid-state";
import BidPlaced from "./components/bid-placed";
import { AccountContext } from '../context/account-context';
import * as backend from '../reach_backend/build/index.main.mjs';
import { ALGO_MyAlgoConnect as MyAlgoConnect } from '@reach-sh/stdlib';
import { useNavigate } from 'react-router-dom';

const reach = loadStdlib('ALGO');
reach.setWalletFallback(reach.walletFallback( { providerEnv: 'TestNet', MyAlgoConnect } ));

function BidInfo() {
  const navigate = useNavigate();
  const { account } = useContext(AccountContext);
  const [auction, setAuction] = useState(null);
  const [outcome, setOutcome] = useState('new');
  const [contractInfo, setContractInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startingBid, setStartingBid] = useState('');
  const [highestBid, setHighestBid] = useState('');
  const [imgSrc, setImgSrc] = useState('');
  const params = useParams();
  const bidState = 'open';
  const [ bidPlaced, updateBidPlaced ] = useState(false);
  const bidBtnRef = useRef(null);
  const inputRef = useRef(null);
  
  useEffect(() => {
    console.log(bidBtnRef.current)
    if(!account){
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    getAuction(params.itemId).then(auction => {
      setAuction(auction);
      setStartingBid(auction.amount);
      setHighestBid(auction.amount);
      setContractInfo(JSON.parse(auction.contractAddress));
      setLoading(false);
      console.log(auction);
      if(auction !== null) {
        setImgSrc(auction.img_url);
      }

      // set the interact
      if(auction) {
        let contract;
        const interact = {
          showOutcome: (address) => {
            if(reach.addressEq(address, account)){
              alert('You won the bid.')
              setOutcome('won')
            } else {
              alert('You lost the bid.')
              setOutcome('lost')
            }
          }
        }

        interact.placeBid = async (highestBid) => {
          // const amount = await ask(`The current highest bid is ${highestBid} ALGO. How much are you willing to pay?`, 
          //   (x) => x
          // );
          // return amount;
          alert('place bid')
          setHighestBid(highestBid);
          let waitForPressResolve;

          const  waitForPress = () => {
              return new Promise(resolve => waitForPressResolve = resolve);
          }

          const btnResolver = () => {
            if (waitForPressResolve) waitForPressResolve();
          }

          bidBtnRef.current.addEventListener('click', btnResolver);
          await waitForPress();
          bidBtnRef.removeEventListener('click', btnResolver);
          const bidAmount = inputRef.current.value;
          alert('You have place bid')
          return Number(bidAmount);
        }

        (async () => {
          contract = account.contract(backend, contractInfo);
          await backend.Bidder(contract, interact);
        })()
        

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
                  
                  <input ref={ inputRef } className="form-control mb-4" placeholder="Amount" type="number" />
                  <button ref={ bidBtnRef } className="btn btn-primary form-control" target="_blank" disabled={bidState==='closed'} >Place Bid</button>
                </div>
              </div>
            </div>
          }

          { !loading && bidPlaced &&
            <div className="col-sm-4">
              <BidPlaced state={outcome}></BidPlaced>
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

