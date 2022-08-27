function BidState(props) {
  return (
    <div className={`bid-state ${props.state}`}>
      { props.state }
    </div>
  );
}

export default BidState;
