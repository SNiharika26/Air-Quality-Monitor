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
import { MatButtonModule } from '@angular/material/button';
import { CurrentAirQualityModalComponent } from './current-air-quality-modal/current-air-quality-modal.component';
import { MatIconModule } from '@angular/material/icon';
import { ContactUsModalComponent } from './contact-us-modal/contact-us-modal.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar'; 
@NgModule({
  declarations: [
    AppComponent,
    HistoryComponent,
    HomeComponent,
    AirQualityModalComponent,
    CurrentAirQualityModalComponent,
    ContactUsModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    HighchartsChartModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule, 
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
