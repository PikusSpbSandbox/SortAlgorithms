import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BubbleSortComponent } from './bubble-sort/bubble-sort.component';
import { ShakerSortComponent } from './shaker-sort/shaker-sort.component';
import { InsertionSortComponent } from './insertion-sort/insertion-sort.component';

@NgModule({
  declarations: [
    AppComponent,
    BubbleSortComponent,
    ShakerSortComponent,
    InsertionSortComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
