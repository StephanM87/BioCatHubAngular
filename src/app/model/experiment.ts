import { Enzyme, Measurement, Vessel, Condition, User } from './biocatalysis';

export interface IExperiment {
    title: string;
    description: string;
    enzymes: Array<Enzyme>;
    vessel: Vessel;
    condition: Condition;
    measurements: Array<Measurement>;
    user: User;
}

export class Experiment implements IExperiment {
    title: string;
    description: string;
    enzymes: Array<Enzyme>;
    vessel: Vessel;
    condition: Condition;
    measurements: Array<Measurement>;
    user: User;

    constructor(experiment? : IExperiment) {
        this.title = experiment && experiment.title || undefined;
        this.description = experiment && experiment.description || undefined;
        this.enzymes = experiment && experiment.enzymes || new Array<Enzyme>();
        this.vessel = experiment && experiment.vessel || new Vessel();
        this.condition = experiment && experiment.condition || new Condition();
        this.measurements = experiment && experiment.measurements || new Array<Measurement>();
        this.user = experiment && experiment.user || new User();
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

    public getMeasurements(): Array<Measurement> {
        return this.measurements;
    }

    public getUser(): User {
        return this.user;
    }

}