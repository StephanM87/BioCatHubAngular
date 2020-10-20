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

  public navigationVisible: boolean;
  public timelineVisible: boolean;
  public collapsed: boolean;

  public vesselLabel = "vessels & volumes";
  public enzymeLabel = "biocatalyst";
  public reagentLabel = "reactants";
  public reactionLabel = "reaction conditions";
  public measurementLabel = "experimental data";

  public vesselState: string;
  public enzymeState: string;
  public reagentState: string;
  public reactionState: string;
  public measurementState: string;

  public vesselStarted: boolean;
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
    this.navigationVisible = !(url == '/' || url == '/start');
    this.timelineVisible = !(url == '/' || url == '/start' || url == '/dashboard');
    if(this.navigationVisible){
      this.updateStarted(url);
      this.updateVesselState();
      this.updateEnzymeState();
      this.updateReagentState();
      this.updateReactionState();
      this.updateMeasurementState();
      this.setCurrentState(url);
      this.updateNavigationButtons(url);
    }
  }

  updateStarted(url: string): void {
    if (url == '/vessel') {
      this.vesselStarted = true;
    } else if (url == '/enzyme') {
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
    if (url == '/vessel') {
      this.setVesselState(this.CURRENT);
    } else if (url == '/enzyme') {
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
    if (url == '/vessel') {
      this.next = true;
      this.nextPage = this.enzymeLabel;
      this.nextRouterLink = './enzyme';
    } else if (url == '/enzyme') {
      this.previous = true;
      this.previousPage = this.vesselLabel;
      this.previousRouterLink = './vessel';
      this.next = true;
      this.nextPage = this.reagentLabel;
      this.nextRouterLink = './reagent';
    } else if (url == '/reagent') {
      this.previous = true;
      this.previousPage = this.enzymeLabel;
      this.previousRouterLink = './enzyme';
      this.next = true;
      this.nextPage = this.reactionLabel;
      this.nextRouterLink = './reaction';
    } else if (url == '/reaction') {
      this.previous = true;
      this.previousPage = this.reagentLabel;
      this.previousRouterLink = './reagent';
      this.next = true;
      this.nextPage = this.measurementLabel;
      this.nextRouterLink = './measurement';
    } else if (url == '/measurement') {
      this.previous = true;
      this.previousPage = this.reactionLabel;
      this.previousRouterLink = './reaction';
    }
  }

  updateVesselState(){
    if(!this.vesselStarted) {
      this.setVesselState(this.NOT_STARTED);
    } else if(this.dataService.getExperiment().validateVessel()){
      this.setVesselState(this.SUCCESS);
    } else {
      this.setVesselState(this.ERROR);
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

  public setVesselState(state: string): void {
    this.vesselState = state;
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
