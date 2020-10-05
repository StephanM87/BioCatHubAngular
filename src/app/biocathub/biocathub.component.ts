import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-biocathub',
  templateUrl: './biocathub.component.html',
  styleUrls: ['./biocathub.component.css']
})
export class BiocathubComponent implements OnInit {

  NOT_STARTED = 'not-started';
  CURRENT = 'current';
  SUCCESS = 'success';
  ERROR = 'error';
  PROCESSING = 'processing';

  public start: boolean = true;
  public collapsed: boolean = false;

  public enzymeState: string;
  public reagentState: string;
  public measurementState: string;
  public dashboardState: string;

  public enzymeStarted: boolean;
  public reagentStarted: boolean;
  public measurementStarted: boolean;

  constructor(private router: Router, private dataService: DataService) {    
    this.setEnzymeState(this.NOT_STARTED);
    this.setReagentState(this.NOT_STARTED);
    this.setMeasurementState(this.NOT_STARTED);
    this.setDashboardState(this.NOT_STARTED);

    this.enzymeStarted = false;
    this.reagentStarted = false;
    this.measurementStarted = false;

    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd){
        this.updateNavigation(val.url);
     }
    });
  }

  ngOnInit(): void { }

  public updateNavigation(url: string){
    this.start = (url == '/start');
    if(!this.start){
      this.updateStarted(url);
      this.updateDashboardState(this.NOT_STARTED);
      this.updateEnzymeState();
      this.updateReagentState();
      this.updateMeasurementState();
      this.setCurrentState(url);
    }
  }

  updateStarted(url: string): void {
    if (url == '/enzyme') {
      this.enzymeStarted = true;
    } else if (url == '/reagent') {
      this.reagentStarted = true;
    } else if (url == '/measurement') {
      this.measurementStarted = true;
    }
  }

  setCurrentState(url: string): void {
    if (url == '/enzyme') {
      this.setEnzymeState(this.CURRENT)
    } else if (url == '/reagent') {
      this.setReagentState(this.CURRENT)
    } else if (url == '/measurement') {
      this.setMeasurementState(this.CURRENT)
    } else if (url == '/dashboard') {
      this.setDashboardState(this.CURRENT)
    }
  }

  updateEnzymeState(){
    if(!this.enzymeStarted) {
      this.setEnzymeState(this.NOT_STARTED);
    } else if(this.dataService.getExperiment().validateEnzymes()){
      this.setEnzymeState(this.SUCCESS);
    } else {
      this.setEnzymeState(this.ERROR);
    }
  }

  updateReagentState(){
    if(!this.reagentStarted) {
      this.setReagentState(this.NOT_STARTED);
    } else if(this.dataService.getExperiment().validateReagents()){
      this.setReagentState(this.SUCCESS);
    } else {
      this.setReagentState(this.ERROR);
    }
  }

  updateMeasurementState(){
    if(!this.measurementStarted) {
      this.setMeasurementState(this.NOT_STARTED);
    } else if(this.dataService.getExperiment().validateMeasurement()){
      this.setMeasurementState(this.SUCCESS);
    } else {
      this.setMeasurementState(this.ERROR);
    }
  }

  updateDashboardState(state: string): void {
    this.setDashboardState(this.NOT_STARTED);
  }

  public setEnzymeState(state: string): void {
    this.enzymeState = state;
  }

  public setReagentState(state: string): void {
    this.reagentState = state;
  }

  public setMeasurementState(state: string): void {
    this.measurementState = state;
  }

  public setDashboardState(state: string): void {
    this.dashboardState = state;
  }

}
