'reach 0.1';

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
  placeBid: Fun([UInt], UInt),
  showBid: Fun([Address], Null),
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
  
  
  
  
  // commit();
  // // The second one to publish always attaches
  // Bidder.publish();
  commit();
  // write your program here
  exit();
});
