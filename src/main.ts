import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { SortAppModule } from './app/sort-app.module';


platformBrowserDynamic().bootstrapModule(SortAppModule)
  .catch(err => console.error(err));
