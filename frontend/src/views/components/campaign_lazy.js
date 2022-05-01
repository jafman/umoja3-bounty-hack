function LazyLoadCampaign() {
  return (
    <div className="col-sm-4 campaign">
      <div className="card shadow-sm">
        <img src="http://placehold.jp/300x150.png" className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">Loading ...</h5>
          <p className="card-text">Please wait ...</p>
          <button className="btn btn-secondary" disabled={true}>Donate</button>
        </div>
      </div>
    </div>
      
  );
}

export default LazyLoadCampaign;
