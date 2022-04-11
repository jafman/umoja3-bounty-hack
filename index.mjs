import {loadStdlib} from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';
const stdlib = loadStdlib(process.env);

const startingBalance = stdlib.parseCurrency(100);

const [ accAdmin, accCampaignOwner, accContributor ] =
  await stdlib.newTestAccounts(3, startingBalance);
console.log('Hello, All!');

console.log('Launching...');
const ctcAdmin = accAdmin.contract(backend);
const ctcCampaginOnwer = accCampaignOwner.contract(backend, ctcAdmin.getInfo());
const ctcContributor = accContributor.contract(backend, ctcAdmin.getInfo());

console.log('Starting backends...');
await Promise.all([
  backend.Admin(ctcAdmin, {
    ...stdlib.hasRandom,
    // implement Admin interact object here
  }),
  backend.CampaignOwner(ctcCampaginOnwer, {
    ...stdlib.hasRandom,
    // implement Campaign Owner interact object here
  }),
  backend.Contributor(ctcContributor, {
    ...stdlib.hasRandom,
    // implement Contributors interact object here
  }),
]);

console.log('Goodbye, Guys!');
