import './App.css';
import Home from './views/Home'
import CampaignWrapper from './views/CampaignWrapper';
import CampaignDetails from './views/CampaignDetails';
import CreateCampaign from './views/CreateCampaign';
import AuctionForm from './views/AuctionForm';
import Login from './views/Login';
import Auctions from './views/Auctions';
import BidInfoWrapper from './views/BidInfoWrapper';
import BidInfo from './views/BidInfo';
import AccountProvider from './context/account-context';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <AccountProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/auctions" element={<Auctions />}/>
          <Route path="/auction" element={<BidInfoWrapper/>}>
            <Route path=":itemId" element={<BidInfo />} />
            <Route path="new" element={<AuctionForm />} />
          </Route>
          <Route path="/campaign" element={<CampaignWrapper/>}>
            <Route path=":campaignId" element={<CampaignDetails />} />
            <Route path="new" element={<CreateCampaign />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AccountProvider>
  );
}

export default App;
