import {loadStdlib} from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';
import { ask, yesno, done } from '@reach-sh/stdlib/ask.mjs';
const stdlib = loadStdlib();

// helper functions
const fmt = (x) => stdlib.formatCurrency(x, 4);
const getBalance = async (acc) => fmt(await stdlib.balanceOf(acc));

const startingBalance = stdlib.parseCurrency(100);
console.log('Loadind...')

const isAuctioneer = await ask('Are you the Auctioneer?', yesno);
console.log(`Your response is: (is auctioneer) ${isAuctioneer}`)
const account = await stdlib.newTestAccount(startingBalance);
console.log('Account has been initialised')

let bidderName = '';
let ctc = null;
let startingBid = 0;
let itemName = '';

if(!isAuctioneer){
  bidderName = await ask(
    'What is your name?', 
    (x) => x
  );
}

// auctioneer should deploy account
if(isAuctioneer){
  console.log('Trying to deploy contract ...')
  ctc = account.contract(backend);
  ctc.getInfo().then(info => {
    console.log(`The contract was deployed as: ${JSON.stringify(info)}`)
  })

  itemName = await ask(
    'What is the namse of the item you are auctioning?', 
    (x) => x
  );

  startingBid = await ask(
    'What is the starting bid?', 
    (x) => x
  );
  
} else {
  const info = await ask(
    'Please paste the contract information:',
    JSON.parse
  );
  ctc = account.contract(backend, info);
}

const interact = {
  showOutcome: (address) => {
    if(isAuctioneer){
      console.log(`Auctioneer saw [${stdlib.formatAddress(address)}] win.`)
    } else {
      console.log(`${bidderName} saw he/she ${stdlib.addressEq(address, account) ? 'won' : 'lost'}.`);
    } 
  }
}

if(isAuctioneer){
  interact.getAuctionInfo = () => 
    {
      return {itemName, startingBid}
    }
} else {
  interact.placeBid = async (highestBid) => {
    const amount = await ask(`The current highest bid is ${highestBid} ALGO. How much are you willing to pay?`, 
      (x) => x
    );
    return amount;
  }
  interact.didPay = async () => {
    const balanceAlgo = await getBalance(account);
    console.log(`Your balance is now ${balanceAlgo} ALGO!`)
  }
  // interact.showPurchase = (address) => {
  //   if (stdlib.addressEq(address, account)) {
  //     console.log(`${buyerName} bought a ticket.`);
  //   }
  // }
}

const currentParticipant = isAuctioneer ? backend.Auctioneer : backend.Bidder;
await currentParticipant(ctc, interact);

const balanceAlgo = await getBalance(account);
console.log(`Your balance is ${balanceAlgo} ALGO!`)
done();


