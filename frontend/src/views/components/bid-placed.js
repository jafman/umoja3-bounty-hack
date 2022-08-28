import hammer from '../../assets/hammer.png';
import sadFace from '../../assets/sad-face.png';
import congrats from '../../assets/congrats.png';

function BidPlaced(props) {
  let imgSrc;
  let msg;
  switch(props.state) {
    case 'new':
      imgSrc = hammer;
      msg = 'Your bid has been placed.';
      break;
    case 'lost':
      imgSrc = sadFace;
      msg = 'Sorry, someone else won this bid.';
      break;
    case 'won':
      imgSrc = congrats;
      msg = 'Congratulations, you won this bid, please pay.';
      break;
    default: 
      imgSrc = hammer;
      msg = 'Your bid has been placed.';
  }
  return (
    <div className="card bid shadow-sm padded-card bid-placed">
      <div className="card-body bidded">
        <img className='b-img mb-3 mt-3' src={imgSrc} width={90} />
        <h5>{msg}</h5>
        <div className='muted mb-4'>Thank You.</div>
        {
          props.state === 'won' &&
          <button className='btn btn-primary btn-pay'>Pay</button>
        }
      </div>
    </div>
  )
}

export default BidPlaced;