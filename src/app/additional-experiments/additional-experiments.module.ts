import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import * as PlotlyJS from 'plotly.js/dist/plotly.js';
import { PlotlyModule } from 'angular-plotly.js';
PlotlyModule.plotlyjs = PlotlyJS;

import { AdditionalExperimentsBaseComponent } from './additional-experiments-base/additional-experiments-base.component';
import { AdditionalExperimentsDetailComponent } from './additional-experiments-detail/additional-experiments-detail.component';
import { PlotComponent } from './plot/plot.component';

@NgModule({
  declarations: [
    AdditionalExperimentsBaseComponent,
    AdditionalExperimentsDetailComponent,
    PlotComponent
  ],
  imports: [
    CommonModule,
    ClarityModule,
    FormsModule,
    NgxDropzoneModule,
    PlotlyModule
  ],
  exports: [
    AdditionalExperimentsBaseComponent,
    AdditionalExperimentsDetailComponent,
  ]
})
export class AdditionalExperimentsModule { }
