import { initFederation } from '@angular-architects/native-federation';

initFederation()
  .then(async () => {
    // NOW the import map is ready — dynamically import and configure
    await import('./logging/logtape-setup');

    return import('./bootstrap');
  })
  .catch(err => console.error(err));
