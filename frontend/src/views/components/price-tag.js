import algo from '../../assets/algo-logo.png';

function PriceTag(props) {
  return (
    <div>
      <div className="price-caption">{props.caption}</div>
      <div className='bid-price'>
        <span className='price'>{props.price}</span>
        <img src={algo} width={15}/>
      </div>
    </div>
  );
}

export default PriceTag;
