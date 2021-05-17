import { Enzyme, Vessel, Condition, User, ExperimentalData } from './biocatalysis';
import { AdditionalExperiment } from 'src/app/additional-experiments/additional-experiment-model';

export interface IExperiment {
    title: string;
    description: string;
    enzymes: Array<Enzyme>;
    vessel: Vessel;
    condition: Condition;
    experimentalData: ExperimentalData;
    user: User;
    additionalExperiments: Array<AdditionalExperiment>;
}

export class Experiment implements IExperiment {
    title: string;
    description: string;
    enzymes: Array<Enzyme>;
    vessel: Vessel;
    condition: Condition;
    experimentalData: ExperimentalData;
    user: User;
    additionalExperiments: Array<AdditionalExperiment>;

    constructor(experiment? : IExperiment) {
        this.title = experiment && experiment.title || undefined;
        this.description = experiment && experiment.description || undefined;
        this.enzymes = experiment && experiment.enzymes || new Array<Enzyme>();
        this.vessel = experiment && experiment.vessel || new Vessel();
        this.condition = experiment && experiment.condition || new Condition();
        this.experimentalData = experiment && experiment.experimentalData || new ExperimentalData();
        this.user = experiment && experiment.user || new User();
        this.additionalExperiments = experiment && experiment.additionalExperiments || new Array<AdditionalExperiment>();
    }

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

    public deleteEnzyme(enzyme: Enzyme) {
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