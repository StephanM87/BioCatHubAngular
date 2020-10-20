import { Enzyme, Reagent, Measurement, Replicate, Vessel, Reaction, ReactionCondition, User } from './biocatalysis';

export interface IExperiment {
    title: string;
    vessel: Vessel;
    reaction: ReactionCondition;
    enzymes: Array<Enzyme>;
    reagents: Array<Reagent>;
    measurement: Measurement;
    description: string;
    user: User;
}

export class Experiment implements IExperiment {
    title: string;
    vessel: Vessel;
    reaction: ReactionCondition;
    enzymes: Array<Enzyme>;
    reagents: Array<Reagent>;
    measurement: Measurement;
    description: string;
    user: User;

    constructor(experiment? : IExperiment) {
        this.title = experiment && experiment.title || undefined;
        this.vessel = experiment && experiment.vessel || new Vessel();
        this.reaction = experiment && experiment.reaction || new ReactionCondition();
        this.enzymes = experiment && experiment.enzymes || new Array<Enzyme>();
        this.reagents = experiment && experiment.reagents || new Array<Reagent>();
        this.measurement = experiment && experiment.measurement || new Measurement();
        this.description = experiment && experiment.description || undefined;
        this.user = experiment && experiment.user || new User();
    }

    public getTitle(): string {
        return this.title;
    }

    public getDescription(): string {
        return this.description;
    }

    public getVessel(): Vessel {
        return this.vessel;
    }

    public validateVessel(): boolean {
        if(this.vessel != undefined){
            return true;
        }
        return false;
    }

    public getReaction(): ReactionCondition {
        return this.reaction;
    }

    public getUser(): User {
        return this.user;
    }


    /* -------------------- Enzymes -------------------- */

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

    public validateEnzymes(): boolean {
        if(this.enzymes.length > 0){
            return true;
        }
        return false;
    }

    /* -------------------- Reagents -------------------- */

    public getReagents(): Array<Reagent> {
        return this.reagents;
    }
    
    public addReagent(reagent: Reagent): void {
        this.reagents.push(reagent);
    }
    
    public deleteReagent(reagent: Reagent): void {
        const index: number = this.reagents.indexOf(reagent);
        if (index !== -1) {
            this.reagents.splice(index, 1);
        }
    }
    
    public deleteReagentById(id: string): void {
        for (let reagent of this.reagents) {
            if(reagent.ligandId && reagent.ligandId == id) {
                this.deleteReagent(reagent);
                break;
            }
        }
    }

    public deleteReagentsOfReaction(reaction: Reaction): void {
        reaction.educts.forEach(educt => {
          let id = educt.structureId;
          let exsist = this.reagentExistInOtherReaction(id, reaction.value);
          if(!exsist) {
            this.deleteReagentById(id);
          }
        });
        reaction.products.forEach(product => {
          let id = product.structureId;
          let exsist = this.reagentExistInOtherReaction(id, reaction.value);
          if(!exsist) {
            this.deleteReagentById(id);
          }
        });
      }

    public hasReagent(id: string): boolean {
        for (let reagent of this.reagents) {
            if(reagent.ligandId && reagent.ligandId == id) {
                return true;
            }
        }
        return false;
    }

    public validateReagents(): boolean {
        if(this.reagents.length > 0){
            return true;
        }
        return false;
    }

    public validateReaction(): boolean {
        if(this.reaction != undefined){
            return true;
        }
        return false;
    }

    public reagentExistInOtherReaction(reagentId: string, currentReaction: string): boolean {
        let exsist = false;
        this.enzymes.forEach(enzyme => {
            enzyme.reactions.forEach(reaction => {
                if(reaction.value != currentReaction) {
                    reaction.educts.forEach(educt => {
                        let id = educt.structureId;
                        if(id && id == reagentId) {
                        exsist = true;
                        }
                    });
                    reaction.products.forEach(product => {
                        let id = product.structureId;
                        if(id && id == reagentId) {
                        exsist = true;
                        }
                    });
                }
            });
        });
        return exsist;
    }

    /* -------------------- Replicas -------------------- */

    public getMeasurement(): Measurement {
        return this.measurement;
    }

    public setMeasurement(measurement: Measurement): void {
        this.measurement = measurement;
    }

    public validateMeasurement(): boolean {
        if(this.measurement.replicates.length > 0){
            return true;
        }
        return false;
    }

}