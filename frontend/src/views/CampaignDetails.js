import { useParams } from "react-router-dom";
import { getCampaign } from '../utils/db';
import { useState, useEffect } from 'react';

function CampaignDetails() {
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [percentage, setPercentage] = useState('0%');
  const [imgSrc, setImgSrc] = useState('');
  const params = useParams();
  //const imgSrc = "https://picsum.photos/300/150?x="+params.campaignId;
  //const percentage = (Number(ca))+'%';
  //console.log('Cached Campaign:' + getCampaign(params.campaignId));
  useEffect(() => {
    getCampaign(params.campaignId).then(campaign => {
      setCampaign(campaign);
      setLoading(false);
      //console.log(campaign);
      if(campaign !== null) {
        setPercentage((campaign.donated/campaign.amount)*100+'%');
        setImgSrc(campaign.img_url);
      }
    });
  }, []);
  
  return (
    <div className="body container campaign_body">
        { campaign!==null &&  <h3>{campaign.title}</h3> }
        {campaign===null && !loading && <h3>Campaign Not Found!</h3>}
        <div className="row">

          <div className="col-sm-8">
            { campaign!==null && <img width={'90%'} src={imgSrc}/>}
            <p>
              {campaign!==null && campaign.description}
            </p>
          </div>
          { campaign!==null &&
            <div className="col-sm-4">
              <div className="card shadow-sm padded-card">
                <div className="card-body">
                  <div className="progress">
                    <div className="progress-bar progress-success" role="progressbar" style={{width: percentage}}></div>
                  </div>
                  <h6>{ campaign!==null && campaign.donated} out of { campaign!==null && campaign.amount } ALGO raised</h6>
                  <br />
                  <button className="btn btn-lg btn-success" target="_blank" >Donate Now</button>
                </div>
              </div>
            </div>
          }
        </div>
    </div>
  );
}

export default CampaignDetails;

