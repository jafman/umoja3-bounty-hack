'reach 0.1';

export const main = Reach.App(() => {
  const A = Participant('Admin', {
    // Admin is meant to deploy the contract while other participants attach to it
  });
  const B = Participant('CampaignOwner', {
    // Specify interact interface for a campaign creator
  });
  const C = Participant('Contributor', {
    // Specify interact interface for a contributor
  });
  init();
  // The first one to publish deploys the contract
  A.publish();
  commit();
  // The second one to publish always attaches
  B.publish();
  commit();
  // The  last to publish also attaches
  C.publish();
  commit();
  // write your program here
  exit();
});
