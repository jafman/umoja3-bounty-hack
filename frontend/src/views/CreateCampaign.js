import { useState } from 'react';
import submitCampaign from '../utils/submitCampaign';
function CreateCampaign(){
  let [ title, setTitle ] = useState('');
  let [ description, setDescription ] = useState('');
  let [ amount, setAmount ] = useState('');
  let [ deadline, setDeadline ] = useState('');
  let [ processing, setProcessing ] = useState(false);

  async function handleSubmit(e){
    e.preventDefault();
    setProcessing(true);
    console.log('Submitting...', title, description, amount, deadline);
    const creator = 'Jafman Kamz';
    const campaignCreated = await submitCampaign(title, description, amount, deadline, creator);
    setProcessing(false);
    if(campaignCreated){
      alert('Campaign Created Successfully');
    } else {
      alert('Error creating campaign!');
    } 
    resetForm();
  }

  function resetForm(){
    setTitle('');
    setDescription('');
    setAmount('');
    setDeadline('');
  }

  function updateTitle(e){
    setTitle(e.target.value);
  }

  function updateDescription(e){
    setDescription(e.target.value);
  }

  function updateAmount(e){
    setAmount(e.target.value);
  }

  function updateDeadline(e){
    setDeadline(e.target.value);
  }

  return (
    <div className="newCampaignWrapper">
      <h3>Create a Campaign</h3>
      <hr/>
      <form className="campaign_form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="camp_title" className="form-label">Campaign Title</label>
          <input type="text" className="form-control" id="camp_title" value={title} required onChange={updateTitle} disabled={processing} />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
        <textarea style={{height: "100px"}} className="form-control" id="description" required value={description} onChange={updateDescription} disabled={processing} />
        </div>

        <div className="mb-3">
          <label htmlFor="amount" className="form-label">Amount</label>
          <input type="number" className="form-control" id="amount" required value={amount} onChange={updateAmount} disabled={processing} />
          <div id="amountHelp" className="form-text">Amount in ALGO.</div>
        </div>

        <div className="mb-3">
          <label htmlFor="deadline" className="form-label">Deadline</label>
          <input type="date" className="form-control" id="deadline" required value={deadline} onChange={updateDeadline} disabled={processing} />
        </div>

        <button type="submit" className="btn btn-success" disabled={processing}>Submit</button>

        { processing && 
          <div className="spinner-border spinner-border-sm" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        }
        

      </form>
    </div>
    
  );
}

export default CreateCampaign;

