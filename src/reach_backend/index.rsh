'reach 0.1';

// it costs one token unit to place a bid
const BID_COST = 1;

const CommonInterface = {
  // Show the address of winner
  showOutcome: Fun([Address], Null),
};

const AuctioneerInterface = {
  ...CommonInterface,
  getAuctionInfo: Fun([], Object({
    itemName: Bytes(50),
    startingBid: UInt
  }))
}

const BidderInterface = {
  ...CommonInterface,
  placeBid: Fun([UInt], UInt)
}

export const main = Reach.App(() => {
  const Auctioneer = Participant('Auctioneer', AuctioneerInterface);
  const Bidder = ParticipantClass('Bidder', BidderInterface);
  
  // Helper to display results to everyone
  const showOutcome = (who) =>
  each([Auctioneer, Bidder], () => {
    interact.showOutcome(who); });
  
  init();

  Auctioneer.only(() => {
    const { itemName, startingBid } =
      declassify(interact.getAuctionInfo());
  });
  Auctioneer.publish(itemName, startingBid);

  const [ keepGoing, bidWinner, highestBid, bidCount ] =
    parallelReduce([ true, Auctioneer, startingBid, 0 ])
      .invariant(balance() == BID_COST * bidCount)
      .while(keepGoing)
      .case(Bidder,
        (() => ({
                when: true
        })),
        ((_) => BID_COST),
        ((_) => {
          
          Bidder.only(() => {
            const bidAmount = declassify(interact.placeBid(highestBid));
          });
          commit();
          Bidder.publish(bidAmount);
          const winner = bidAmount > highestBid 
            ? this
            : bidWinner
          
          const newHighestBid = bidAmount > highestBid
            ? bidAmount
            : highestBid
          
          // Bidder.only(()=>{

          // });
          
          return [ bidCount < 4, winner, newHighestBid, bidCount + 1 ]

        }))
       .timeout(relativeTime(3), () => {
         Anybody.publish();
         return [ false, bidWinner, highestBid, bidCount]
       });
  
  transfer(balance()).to(Auctioneer);
  commit();
  showOutcome(bidWinner)
  exit();
});
