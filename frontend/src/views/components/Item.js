import algo from '../../assets/algo-logo.png';
import { Link } from 'react-router-dom';
function BidItem(props) {
  return (
    <div className="col-sm-4 campaign">
      <div className="card shadow-sm">
        <img src={props.auction.imgUrl} className="card-img-top" alt="..."/>
        <div className="card-body bid-item">
          <h5 className="card-title">{props.auction.title}</h5>
          <span className="card-text">Starting Bid</span>
          <div className='bid-price'>
            <span className='price'>{props.auction.startingBid}</span>
            <img src={algo} width={15}/>
          </div>
          <Link to={`/auction/${props.auction.id}`}>
            <button className="btn btn-primary bid-item" disabled={!props.available}>Bid</button>
          </Link>
        </div>
      </div>
    </div>
      
  );
}

export default BidItem;
