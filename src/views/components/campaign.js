import { Link } from "react-router-dom";

function Campaign(props) {
  const percentage = Number(props.donated)/Number(props.total) * 100 +'%';
  const href = '/campaign/' + props.id;
  return (
    <div className="col-sm-4 campaign">
      <div className="card shadow-sm">
        <img src={props.img_url} className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.body}</p>
          <div className="progress">
            <div className="progress-bar progress-success" role="progressbar" style={{width: percentage}}></div>
          </div>
          <h6>{props.donated} out of {props.total} ALGO raised</h6>
          <a href={href} className="btn btn-success" target="_blank" rel="noreferrer">Donate</a>
        </div>
      </div>
    </div>
      
  );
}

export default Campaign;
