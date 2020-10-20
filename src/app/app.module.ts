import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BiocathubComponent } from './biocathub/biocathub.component';
import { HeaderComponent } from './component/header/header.component';
import { StartpageComponent } from './component/startpage/startpage.component';

import { FormsModule } from '@angular/forms';
import { EnzymeComponent } from './component/enzyme/enzyme.component';
import { MeasurementComponent } from './component/measurement/measurement.component';
import { ReagentComponent } from './component/reagent/reagent.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';

import { NgxDropzoneModule } from 'ngx-dropzone';

import { HttpClientModule } from '@angular/common/http';
import { ReactionComponent } from './component/reaction/reaction.component';
import { VesselComponent } from './component/vessel/vessel.component';

@NgModule({
  declarations: [
    AppComponent,
    BiocathubComponent,
    HeaderComponent,
    StartpageComponent,
    EnzymeComponent,
    MeasurementComponent,
    ReagentComponent,
    DashboardComponent,
    ReactionComponent,
    VesselComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgxDropzoneModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
