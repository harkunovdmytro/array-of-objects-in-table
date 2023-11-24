import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DataService } from 'src/app/shared/services/data.service';

import { AppComponent } from './app.component';
import { DataViewComponent } from './data-view/data-view.component';

@NgModule({
  declarations: [
    AppComponent,
    DataViewComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
