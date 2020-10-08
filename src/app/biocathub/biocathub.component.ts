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
  public reactionState: string;
  public measurementState: string;

  public enzymeStarted: boolean;
  public reagentStarted: boolean;
  public reactionStarted: boolean;
  public measurementStarted: boolean;

  public previous: boolean;
  public next: boolean;
  public previousPage: string;
  public nextPage: string;
  public previousRouterLink: string;
  public nextRouterLink: string;

  constructor(private router: Router, private dataService: DataService) {    
    this.setEnzymeState(this.NOT_STARTED);
    this.setReagentState(this.NOT_STARTED);
    this.setReactionState(this.NOT_STARTED);
    this.setMeasurementState(this.NOT_STARTED);

    this.enzymeStarted = false;
    this.reagentStarted = false;
    this.reactionStarted = false;
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
      this.updateEnzymeState();
      this.updateReagentState();
      this.updateReactionState();
      this.updateMeasurementState();
      this.setCurrentState(url);
      this.updateNavigationButtons(url);
    }
  }

  updateStarted(url: string): void {
    if (url == '/enzyme') {
      this.enzymeStarted = true;
    } else if (url == '/reagent') {
      this.reagentStarted = true;
    } else if (url == '/reaction') {
      this.reactionStarted = true;
    } else if (url == '/measurement') {
      this.measurementStarted = true;
    }
  }

  setCurrentState(url: string): void {
    if (url == '/enzyme') {
      this.setEnzymeState(this.CURRENT);
    } else if (url == '/reagent') {
      this.setReagentState(this.CURRENT);
    } else if (url == '/reaction') {
      this.setReactionState(this.CURRENT);
    } else if (url == '/measurement') {
      this.setMeasurementState(this.CURRENT);
    }
  }

  updateNavigationButtons(url: string): void{
    this.previous = false;
    this.next = false;
    this.nextRouterLink = '';
    this.previousRouterLink = '';
    if (url == '/enzyme') {
      this.next = true;
      this.nextPage = 'Reagents';
      this.nextRouterLink = './reagent';
    } else if (url == '/reagent') {
      this.previous = true;
      this.previousPage ='Enzymes';
      this.previousRouterLink = './enzyme';
      this.next = true;
      this.nextPage = 'Reaction';
      this.nextRouterLink = './reaction';
    } else if (url == '/reaction') {
      this.previous = true;
      this.previousPage ='Reagents';
      this.previousRouterLink = './reagent';
      this.next = true;
      this.nextPage = 'Measurement';
      this.nextRouterLink = './measurement';
    } else if (url == '/measurement') {
      this.previous = true;
      this.previousPage ='Reaction';
      this.previousRouterLink = './reaction';
      this.next = true;
      this.nextPage = 'Overview';
      this.nextRouterLink = './dashboard';
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

  updateReactionState(){
    if(!this.reactionStarted) {
      this.setReactionState(this.NOT_STARTED);
    } else if(this.dataService.getExperiment().validateReaction()){
      this.setReactionState(this.SUCCESS);
    } else {
      this.setReactionState(this.ERROR);
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

  public setEnzymeState(state: string): void {
    this.enzymeState = state;
  }

  public setReagentState(state: string): void {
    this.reagentState = state;
  }

  public setReactionState(state: string): void {
    this.reactionState = state;
  }

  public setMeasurementState(state: string): void {
    this.measurementState = state;
  }

}
