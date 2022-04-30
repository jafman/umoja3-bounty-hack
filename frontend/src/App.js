import './App.css';
import Home from './views/Home'
import CampaignWrapper from './views/CampaignWrapper';
import CampaignDetails from './views/CampaignDetails';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/campaign" element={<CampaignWrapper/>}>
          <Route path=":campaignId" element={<CampaignDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
