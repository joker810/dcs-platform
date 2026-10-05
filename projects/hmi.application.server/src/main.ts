import { initFederation } from '@angular-architects/native-federation';

initFederation()
  .then(async () => {
    return import('./bootstrap');
  })
  .catch(err => console.error(err));
