function CreateCampaign(){
  return (
    <div className="newCampaignWrapper">
      <h3>Create a Campaign</h3>
      <hr/>
      <form className="campaign_form">
        <div className="mb-3">
          <label htmlFor="camp_title" className="form-label">Campaign Title</label>
          <input type="email" className="form-control" id="camp_title" />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
        <textarea style={{height: "100px"}} className="form-control" id="description" />
        </div>

        <div className="mb-3">
          <label htmlFor="amount" className="form-label">Amount</label>
          <input type="number" className="form-control" id="amount" />
          <div id="amountHelp" className="form-text">Amount in ALGO.</div>
        </div>

        <button type="submit" className="btn btn-success">Submit</button>
      </form>
    </div>
    
  );
}

export default CreateCampaign;

