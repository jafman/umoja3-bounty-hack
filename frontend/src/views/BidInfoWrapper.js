import Header from './Header'
import Footer from './Footer';
import { Outlet } from "react-router-dom";
function BidInfoWrapper() {
  return (
    <div className="CampaignWrapper">
      <Header showLinks={true}></Header>
      <Outlet />
    </div>
  );
}

export default BidInfoWrapper;
