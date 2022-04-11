'reach 0.1';
'use strict';

export const main = Reach.App(() => {

  // Campaign Creator
  const A = Participant('Creator', {
    // Creator gives the target amount for the campaign
    getTarget: Fun([], UInt),

    // Creator is shown how much donation have be made
    showDonation: Fun([UInt], Null),
  });

  const B = Participant('Donor', {
    // Donor is shown expected target for the campaign
    showTarget: Fun([UInt], Null),

    // The donor tells the contract how much he is willing to donate
    getDonation: Fun([], UInt),
  });

  init();

  A.only(() => {
    const targetAmount = declassify(interact.getTarget());
  });

  A.publish(targetAmount);
  commit();

  // Show the target amount to the donor
  B.interact.showTarget(targetAmount);
  B.publish();
  commit();
  
  // The donor shows the contract the amount he is willing to donate
  B.only(() => {
    const donationAmount = declassify(interact.getDonation());
  });
  B.publish(donationAmount);
  commit();

  // make Donor Pay 
  A.pay(donationAmount);
  commit();

  // Get Total Donation
  A.interact.showDonation(donationAmount);
  A.publish();

  // Transfer fund to Creator
  transfer(donationAmount).to(A);
  commit();

  exit();
});
