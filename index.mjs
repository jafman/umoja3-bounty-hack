import {loadStdlib} from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';

const stdlib = loadStdlib();

// Make accounts
const startingBalance = stdlib.parseCurrency(100);
const [ accCreator, accDonor ] =
  await stdlib.newTestAccounts(2, startingBalance);

const fmt = (x) => stdlib.formatCurrency(x, 4);

// Create a campaign and donate to the course
const createCampaign = async (targetAmount, donationAmount) => {

  console.log('\n');

  // The Creator launches the fundme contract, and a Donor joins
  const ctcCreator = accCreator.contract(backend);
  const ctcDonor = accDonor.contract(backend, ctcCreator.getInfo());

  // Creator and Donor provides frontend interfaces so the contract can take place
  await Promise.all([
    backend.Creator(ctcCreator, {
      getTarget: () => { 
        return [targetAmount]; 
      },
      showDonation: (amount) => {
        console.log(`Creator as realised ${fmt(amount)} ${stdlib.standardUnit} out of ${fmt(targetAmount)} ${stdlib.standardUnit} for this campaign.`);
      },
    }),

    backend.Donor(ctcDonor, {
      showTarget: (amount) => {
        console.log(`Creator wants fund worth ${fmt(amount)} ${stdlib.standardUnit} for this campaign.`);
      },
      getDonation: () => {
        console.log(`Donor wants to donate ${fmt(donationAmount)} ${stdlib.standardUnit}`);
        return [donationAmount];
      }
    }),
  ]);
};

await createCampaign(stdlib.parseCurrency(50), stdlib.parseCurrency(22));
