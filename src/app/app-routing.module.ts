import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StartpageComponent } from '../app/component/startpage/startpage.component';
import { EnzymeComponent } from '../app/component/enzyme/enzyme.component';
import { ReagentComponent } from '../app/component/reagent/reagent.component';
import { MeasurementComponent } from '../app/component/measurement/measurement.component';
import { DashboardComponent } from '../app/component/dashboard/dashboard.component';


const routes: Routes = [
  { path: 'startpage', component: StartpageComponent },
  { path: 'enzyme', component: EnzymeComponent },
  { path: 'reagent', component: ReagentComponent },
  { path: 'measurement', component: MeasurementComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: 'startpage', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
