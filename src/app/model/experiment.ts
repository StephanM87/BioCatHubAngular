import {Condition, Enzyme, ExperimentalData, User, Vessel} from './biocatalysis';

// TODO probably unnecessary to have an interface for this class, we can use the class directly: check usage and remove if possible
export interface IExperiment {
  title: string;
  description: string;
  enzymes: Array<Enzyme>;
  vessel: Vessel;
  condition: Condition;
  experimentalData: ExperimentalData;
  user: User;
}

export class Experiment implements IExperiment {
  title: string;
  description: string;
  enzymes: Array<Enzyme>;
  vessel: Vessel;
  condition: Condition;
  experimentalData: ExperimentalData;
  user: User;

  constructor(experiment?: IExperiment) {
    this.title = experiment?.title;
    this.description = experiment?.description;
    this.enzymes = experiment?.enzymes || new Array<Enzyme>();
    this.vessel = experiment?.vessel || new Vessel();
    this.condition = experiment?.condition || new Condition();
    this.experimentalData = experiment?.experimentalData || new ExperimentalData();
    this.user = experiment?.user || new User();
  }

  // TODO use typescript getter notation
  public getTitle(): string {
    return this.title;
  }

  public getDescription(): string {
    return this.description;
  }

  public getEnzymes(): Array<Enzyme> {
    return this.enzymes;
  }

  public addEnzyme(newEnzyme: Enzyme): void {
    this.enzymes.push(newEnzyme);
  }

  public deleteEnzyme(enzyme: Enzyme): void {
    const index: number = this.enzymes.indexOf(enzyme);
    if (index !== -1) {
      this.enzymes.splice(index, 1);
    }
  }

  public getVessel(): Vessel {
    return this.vessel;
  }

  public getReactionConditions(): Condition {
    return this.condition;
  }

  public getExperimentalData(): ExperimentalData {
    return this.experimentalData;
  }

  public getUser(): User {
    return this.user;
  }

}
