import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StartpageComponent } from './component/start/startpage/startpage.component';
import { VesselComponent } from './component/vessel/vessel.component';
import { BiokatalystBaseComponent } from './component/biokatalyst/biokatalyst-base/biokatalyst-base.component';
import { MeasurementBaseComponent } from './component/measurement/measurement-base/measurement-base.component';
import { ReactantBaseComponent } from './component/reactants/reactant-base/reactant-base.component';
import { ReactionComponent } from './component/reaction/reaction.component';
import { DashboardBaseComponent } from './component/dashboard/dashboard-base/dashboard-base.component';


const routes: Routes = [
  { path: 'start', component: StartpageComponent },
  { path: 'vessel', component: VesselComponent },
  { path: 'biokatalyst', component: BiokatalystBaseComponent },
  { path: 'reactants', component: ReactantBaseComponent },
  { path: 'reaction', component: ReactionComponent },
  { path: 'measurement', component: MeasurementBaseComponent },
  { path: 'dashboard', component: DashboardBaseComponent },
  { path: '', redirectTo: 'start', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
