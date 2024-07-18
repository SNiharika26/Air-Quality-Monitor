import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HistoryComponent } from './history/history.component';
import { HomeComponent } from './home/home.component';

import { HighchartsChartModule } from 'highcharts-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { AirQualityModalComponent } from './air-quality-modal/air-quality-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HistoryComponent,
    HomeComponent,
    AirQualityModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    HighchartsChartModule,
    BrowserAnimationsModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
