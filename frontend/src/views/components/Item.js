import algo from '../../assets/algo-logo.png';

function BidItem(props) {
  return (
    <div className="col-sm-4 campaign">
      <div className="card shadow-sm">
        <img src={props.imgSrc} className="card-img-top" alt="..."/>
        <div className="card-body bid-item">
          <h5 className="card-title">Adidas Sneakers</h5>
          <span className="card-text">Starting Bid</span>
          <div className='bid-price'>
            <span className='price'>3</span>
            <img src={algo} width={15}/>
          </div>
          <button className="btn btn-primary bid-item" disabled={!props.available}>Bid</button>
        </div>
      </div>
    </div>
      
  );
}

export default BidItem;
