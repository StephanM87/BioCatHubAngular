import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { HttpClientModule } from '@angular/common/http';

import * as PlotlyJS from 'plotly.js/dist/plotly.js';
import { PlotlyModule } from 'angular-plotly.js';
PlotlyModule.plotlyjs = PlotlyJS;

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BiocathubComponent } from './biocathub/biocathub.component';
import { StartpageComponent } from './component/start/startpage/startpage.component';
import { ExperimentsComponent } from './component/start/experiments/experiments.component';
import { DescriptionComponent } from './component/start/description/description.component';
import { TechnologiesComponent } from './component/start/technologies/technologies.component';
import { VesselComponent } from './component/vessel/vessel.component';
import { BiokatalystBaseComponent } from './component/biokatalyst/biokatalyst-base/biokatalyst-base.component';
import { EnzymeSearchComponent } from './component/biokatalyst/enzyme-search/enzyme-search.component';
import { EnzymeDetailComponent } from './component/biokatalyst/enzyme-detail/enzyme-detail.component';
import { ReactantBaseComponent } from './component/reactants/reactant-base/reactant-base.component';
import { ReactantDetailComponent } from './component/reactants/reactant-detail/reactant-detail.component';
import { ReactionEditorComponent } from './component/reactants/reaction-editor/reaction-editor.component';
import { ReactionComponent } from './component/reaction/reaction.component';
import { MeasurementBaseComponent } from './component/measurement/measurement-base/measurement-base.component';
import { MeasurementDetailComponent } from './component/measurement/measurement-detail/measurement-detail.component';
import { InputComboComponent } from './component/util/input-combo/input-combo.component';
import { OverlaySpinnerComponent } from './component/util/overlay-spinner/overlay-spinner.component';
import { DashboardBaseComponent } from './component/dashboard/dashboard-base/dashboard-base.component';
import { DashboardExperimentComponent } from './component/dashboard/dashboard-experiment/dashboard-experiment.component';
import { DashboardVesselComponent } from './component/dashboard/dashboard-vessel/dashboard-vessel.component';
import { DashboardBiokatalystComponent } from './component/dashboard/dashboard-biokatalyst/dashboard-biokatalyst.component';
import { DashboardReactantsComponent } from './component/dashboard/dashboard-reactants/dashboard-reactants.component';
import { DashboardReactionComponent } from './component/dashboard/dashboard-reaction/dashboard-reaction.component';
import { DashboardMeasurementComponent } from './component/dashboard/dashboard-measurement/dashboard-measurement.component';
//import {ReactionComponent} from './component/reaction/reaction.component'
//import { AqueousComponent } from './component/reaction/aqueous/aqueous.component';
//import { MicroAqueousComponent } from './component/reaction/micro-aqueous/micro-aqueous.component';
//import { OrganicSolventComponent } from './component/reaction/micro-aqueous/organic-solvent/organic-solvent.component';
//import { AqueousSolventComponent } from './component/reaction/micro-aqueous/aqueous-solvent/aqueous-solvent.component';



@NgModule({
  declarations: [
    AppComponent,
    BiocathubComponent,
    StartpageComponent,
    ExperimentsComponent,
    DescriptionComponent,
    TechnologiesComponent,
    VesselComponent,
    BiokatalystBaseComponent,
    EnzymeSearchComponent,
    EnzymeDetailComponent,
    ReactantBaseComponent,
    ReactantDetailComponent,
    ReactionEditorComponent,
    ReactionComponent,
    MeasurementBaseComponent,
    MeasurementDetailComponent,
    DashboardBaseComponent,
    DashboardExperimentComponent,
    DashboardVesselComponent,
    DashboardBiokatalystComponent,
    DashboardReactantsComponent,
    DashboardReactionComponent,
    DashboardMeasurementComponent,
    InputComboComponent,
    OverlaySpinnerComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgxDropzoneModule,
    PlotlyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
