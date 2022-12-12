import {ModuleWithProviders, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SortAppComponent } from './sort-app.component';
import { BubbleSortComponent } from './bubble-sort/bubble-sort.component';
import { ShakerSortComponent } from './shaker-sort/shaker-sort.component';
import { InsertionSortComponent } from './insertion-sort/insertion-sort.component';

@NgModule({
  declarations: [
    SortAppComponent,
    BubbleSortComponent,
    ShakerSortComponent,
    InsertionSortComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [SortAppComponent]
})
export class SortAppModule { }

@NgModule({})
export class SortSharedAppModule {
  static forRoot(): ModuleWithProviders<SortSharedAppModule> {
    return {
      ngModule: SortAppModule,
      providers: []
    }
  }
}
