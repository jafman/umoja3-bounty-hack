import Header from './Header'
import Footer from './Footer';
import { Outlet } from "react-router-dom";
function CampaignWrapper() {
  return (
    <div className="CampaignWrapper">
      <Header/>
      <Outlet />
      <Footer/>
    </div>
  );
}

export default CampaignWrapper;
