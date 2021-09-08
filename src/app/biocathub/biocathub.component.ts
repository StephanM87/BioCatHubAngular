import {Component} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {DataService} from '../service/data.service';

export interface NavigationElement {
  label: string;
  icon: string;
  started: boolean;
  state: string;
  error: string;
  router: string;
  previous: string;
  next: string;
  previousLink: string;
  nextLink: string;
}

const NOT_STARTED = 'not-started';
const CURRENT = 'current';
const SUCCESS = 'success';
const ERROR = 'error';

const VESSEL = 'vessels & volumes';
const ENZYME = 'biocatalyst';
const REAGENT = 'reactants';
const REACTION = 'reaction conditions';
const MEASUREMENT = 'experimental data';

const VESSEL_LINK = './vessel';
const ENZYME_LINK = './biokatalyst';
const REAGENT_LINK = './reactants';
const REACTION_LINK = './reaction';
const MEASUREMENT_LINK = './measurement';

@Component({
  selector: 'app-biocathub',
  templateUrl: './biocathub.component.html',
  styleUrls: ['./biocathub.component.css']
})
export class BiocathubComponent {

  public vesselNavigation: NavigationElement;
  public enzymeNavigation: NavigationElement;
  public reagentNavigation: NavigationElement;
  public reactionNavigation: NavigationElement;
  public measurementNavigation: NavigationElement;

  public navigation: NavigationElement[];

  public navigationVisible: boolean;
  public timelineVisible: boolean;
  public collapsed: boolean;

  public previous: string;
  public next: string;
  public previousLink: string;
  public nextLink: string;

  constructor(private router: Router, private dataService: DataService) {
    this.vesselNavigation = {
      label: VESSEL, icon: 'volume', started: false, state: NOT_STARTED, error: undefined, router: VESSEL_LINK,
      previous: undefined, next: ENZYME, previousLink: undefined, nextLink: ENZYME_LINK
    };
    this.enzymeNavigation = {
      label: ENZYME, icon: 'helix', started: false, state: NOT_STARTED, error: undefined, router: ENZYME_LINK,
      previous: VESSEL, next: REAGENT, previousLink: VESSEL_LINK, nextLink: REAGENT_LINK
    };
    this.reagentNavigation = {
      label: REAGENT, icon: 'flask', started: false, state: NOT_STARTED, error: undefined, router: REAGENT_LINK,
      previous: ENZYME, next: REACTION, previousLink: ENZYME_LINK, nextLink: REACTION_LINK
    };
    this.reactionNavigation = {
      label: REACTION, icon: 'thermometer', started: false, state: NOT_STARTED, error: undefined, router: REACTION_LINK,
      previous: REAGENT, next: MEASUREMENT, previousLink: REAGENT_LINK, nextLink: MEASUREMENT_LINK
    };
    this.measurementNavigation = {
      label: MEASUREMENT,
      icon: 'line-chart',
      started: false,
      state: NOT_STARTED,
      error: undefined,
      router: MEASUREMENT_LINK,
      previous: REACTION,
      next: undefined,
      previousLink: REACTION_LINK,
      nextLink: undefined
    };

    this.navigation = [
      this.vesselNavigation,
      this.enzymeNavigation,
      this.reagentNavigation,
      this.reactionNavigation,
      this.measurementNavigation
    ];

    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        const url = val.url;
        this.validate(url);
        this.updateNavigation(url);
        this.setCurrentState(url);
      }
    });
  }

  public resetNavigation(): void {
    this.navigation.forEach(nav => {
      nav.started = false;
      nav.state = NOT_STARTED;
      nav.error = undefined;
    });
  }

  public updateNavigation(url: string): void {
    const start = (url === '/' || url === '/start');
    this.navigationVisible = !start;
    this.timelineVisible = !(start || url === '/dashboard');
    if (start) {
      this.resetNavigation();
    } else {
      this.updateStarted(url);
      this.updateNavigationButtons(url);
    }
  }

  public validate(url: string): void {
    this.dataService.validateExperiment();
    this.updateState(this.vesselNavigation, this.dataService.vesselValidation);
    this.updateState(this.enzymeNavigation, this.dataService.enzymeValidation);
    this.updateState(this.reagentNavigation, this.dataService.reactantValidation);
    this.updateState(this.reactionNavigation, this.dataService.conditionValidation);
    this.updateState(this.measurementNavigation, this.dataService.measurementValidation);
  }

  getErrorMessage(validation: string[]): string {
    return validation.length > 0 ? validation.join(', ') + ' has not been defined' : undefined;
  }

  updateStarted(url: string): void {
    switch (url) {
      case '/vessel':
        this.vesselNavigation.started = true;
        break;
      case '/biokatalyst':
        this.enzymeNavigation.started = true;
        break;
      case '/reactants':
        this.reagentNavigation.started = true;
        break;
      case '/reaction':
        this.reactionNavigation.started = true;
        break;
      case '/measurement':
        this.measurementNavigation.started = true;
        break;

    }
  }


  setCurrentState(url: string): void {
    switch (url) {
      case '/vessel':
        this.vesselNavigation.state = CURRENT;
        break;
      case '/biokatalyst':
        this.enzymeNavigation.state = CURRENT;
        break;
      case '/reactants':
        this.reagentNavigation.state = CURRENT;
        break;
      case '/reaction':
        this.reactionNavigation.state = CURRENT;
        break;
      case '/measurement':
        this.measurementNavigation.state = CURRENT;
        break;
    }
  }

  updateNavigationButtons(url: string): void {
    switch (url) {
      case '/vessel':
        this.setNavigationButtons(this.vesselNavigation);
        break;
      case '/biokatalyst':
        this.setNavigationButtons(this.enzymeNavigation);
        break;
      case '/reactants':
        this.setNavigationButtons(this.reagentNavigation);
        break;
      case '/reaction':
        this.setNavigationButtons(this.reactionNavigation);
        break;
      case '/measurement':
        this.setNavigationButtons(this.measurementNavigation);
        break;
    }
  }

  setNavigationButtons(nav: NavigationElement): void {
    this.previous = nav.previous;
    this.previousLink = nav.previousLink;
    this.next = nav.next;
    this.nextLink = nav.nextLink;
  }

  updateState(nav: NavigationElement, errors: string[]): void {
    if (!nav.started) {
      nav.state = NOT_STARTED;
    } else {
      nav.error = this.getErrorMessage(errors);
      nav.state = nav.error ? ERROR : SUCCESS;
    }
  }

}
