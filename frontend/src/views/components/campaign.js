import { Link } from "react-router-dom";

function Campaign(props) {
  const percentage = Number(props.donated)/Number(props.total) * 100 +'%';
  const rnd = Math.floor(Math.random()*500)+1;
  const imgSrc = "https://picsum.photos/300/150?x="+rnd;
  const href = '/campaign/' + rnd;
  return (
    <div className="col-sm-4 campaign">
      <div className="card shadow-sm">
        <img src={imgSrc} className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.body}</p>
          <div className="progress">
            <div className="progress-bar progress-success" role="progressbar" style={{width: percentage}}></div>
          </div>
          <h6>{props.donated} out of {props.total} ALGO raised</h6>
          <a href={href} className="btn btn-success" target="_blank" >Donate</a>
        </div>
      </div>
    </div>
      
  );
}

export default Campaign;
