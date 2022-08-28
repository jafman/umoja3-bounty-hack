import { useState } from 'react';
import { createAuction, uploadImg } from '../utils/db';
import uploadIcon from '../assets/upload.png';
import hammer from '../assets/hammer.png';
function CreateCampaign(){
  const [ title, setTitle ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ amount, setAmount ] = useState('');
  const [ processing, setProcessing ] = useState(false);
  const [ success, setSuccess ] = useState(false);
  const [ fileUpload, setFileUpload ] = useState('');
  const [ imgSrc, setImgSrc ] = useState('');

  async function handleSubmit(e){
    e.preventDefault();
    setProcessing(true);
    const imgUrl = await uploadImg(fileUpload, 'uploads/');
    let auction;
    if(imgUrl){
      // create contract
      const contract = '0x66687y868hghgj'
      auction = createAuction(title, description, amount, imgUrl, contract);
    }

    if(imgUrl && auction) {
      setSuccess(true);
    } else {
      alert('Error creating auction')
    }


    
    setProcessing(false);
    resetForm();
  }

  function resetForm(){
    setTitle('');
    setDescription('');
    setAmount('');
    setImgSrc('');
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

  function selectFile() {
    document.querySelector('#file-upload').click();
  }

  function handleFileSelect(e) {
    console.log('What happened:', e.target.files);
    const imgUrl = URL.createObjectURL(e.target.files[0]);
    setFileUpload(e.target.files[0]);
    setImgSrc(`url(${imgUrl})`);
  }

  return (
    
    <div>
      {
        success &&
        <div className='blur' onClick={()=>setSuccess(false)}></div>
      } 

      {
        success &&
        <div className="card-sm card bid shadow-sm padded-card bid-placed">
          <div className="card-body bidded">
            <img className='b-img mb-3 mt-3' src={hammer} width={90} />
            <h5>Congratulations, your auction has been posted.</h5>
            <div className='muted mb-4'>Thank You.</div>
          </div>
        </div>
      }

      <h5 className='new-form-hd'>Post a New Auction</h5>
      <div className="newCampaignWrapper shadow-sm mb-5">
        <form className="campaign_form" onSubmit={handleSubmit}>
          
          <div className='row mb-3'>
            <div className="col-sm-6">
              <label htmlFor="camp_title" className="form-label">Item Name</label>
              <input type="text" className="form-control" id="camp_title" value={title} required onChange={updateTitle} disabled={processing} />
            </div>

            <div className="col-sm-6">
              <label htmlFor="bid_amount" className="form-label">Starting Bid</label>
              <input type="number" className="form-control" id="bid_amount" value={amount} required onChange={updateAmount} disabled={processing} />
            </div>
          </div>
          

          <div className="mb-3">
            <label htmlFor="description" className="form-label">Item Description</label>
          <textarea style={{height: "150px"}} className="form-control" id="description" required value={description} onChange={updateDescription} disabled={processing} />
          </div>

          <div className="mb-3">
            <label htmlFor="amount" className="form-label">Image</label>
            <div className='form-control img-upload' style={{"backgroundImage":imgSrc}}>
              <img className='d-block m-auto mt-5 mb-2' src={uploadIcon} width={40} height={30} />
              <div className='muted m-auto upload-label mb-2'>Drop files to upload or click.</div>
              <button type='button' onClick={selectFile} className='btn btn-primary btn-sm d-block m-auto'>upload Image</button>
              <input id='file-upload' onChange={handleFileSelect} className='d-none' type="file" accept="image/*" />
            </div>
          </div>

          

          <button type="submit" className="btn btn-primary form-control" disabled={processing}>Submit Auction</button>

          { processing && 
            <div className="spinner-border spinner-border-sm" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          }
          

        </form>
      </div>
    </div>
    
  );
}

export default CreateCampaign;

