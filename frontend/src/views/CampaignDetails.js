import { useParams } from "react-router-dom";

function CampaignDetails() {
  const params = useParams();
  const imgSrc = "https://picsum.photos/300/150?x="+params.campaignId;
  const percentage = '85%';
  const donated = 170;
  const total = 200;
  return (
    <div className="body container campaign_body">
        <h3>Campaign One</h3>
        <div className="row">
          <div className="col-sm-8">
            <img width={'90%'} src={imgSrc}/>
            <p>
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. 
            The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, 
            content here', making it look like readable English.
            </p>
          </div>
          <div className="col-sm-4">
            <div className="card shadow-sm padded-card">
              <div className="card-body">
                <div className="progress">
                  <div className="progress-bar progress-success" role="progressbar" style={{width: percentage}}></div>
                </div>
                <h6>{donated} out of {total} ALGO raised</h6>
                <br />
                <button className="btn btn-lg btn-success" target="_blank" >Donate Now</button>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

export default CampaignDetails;

