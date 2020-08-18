import { Enzyme, Reagent, Replicate, Vessel } from './biocatalysis';

export class Experiment {
    id: number;
    vessel: Vessel;
    enzymes: Enzyme[];
    reagents: Reagent[];
    replicates: Replicate[];

    constructor() {
        this.id = undefined;
        this.vessel = new Vessel();
        this.enzymes = new Array<Enzyme>();
        this.reagents = new Array<Reagent>();
        this.replicates = new Array<Replicate>();
    }

    public getId(): number {
        return this.id;
    }

    public getVessel(): Vessel {
        return this.vessel;
    }


    /* -------------------- Enzymes -------------------- */

    public getEnzymes(): Enzyme[] {
        return this.enzymes;
    }

    public getEnzyme(id: number): Enzyme {
        for(let enzyme of this.enzymes) {
            if(id == enzyme.id) {
                return enzyme;
            }
        }
    }

    public addEnzyme(newEnzyme: Enzyme): void {
        this.enzymes.push(newEnzyme);
    }

    public deleteEnzyme(id: number) {
        const index: number = this.enzymes.indexOf(this.getEnzyme(id));
        if (index !== -1) {
            this.enzymes.splice(index, 1);
        }
    }

    public updateEnzyme(newEnzyme: Enzyme): void {
        var enzyme = this.getEnzyme(newEnzyme.id);
        enzyme.name = newEnzyme.name;
        enzyme.sequence = newEnzyme.sequence;
        enzyme.concentration = newEnzyme.concentration;
        enzyme.unit = newEnzyme.unit;
        enzyme.boundary = newEnzyme.boundary;
        enzyme.constant = newEnzyme.constant;
    }

    public getNextEnzymeId(): number {
        var max: number = 1;
        for(let enzyme of this.enzymes) {
            if(enzyme.id > max) {
                max = enzyme.id;
            }
        }
        return max+1;
    }

    /* -------------------- Reagents -------------------- */

    public getReagents(): Reagent[] {
        return this.reagents;
    }
    
    public getReagent(id: number): Reagent {
        for(let reagent of this.reagents) {
        if(id == reagent.id) {
            return reagent;
        }
        }
    }
    
    public addReagent(newReagent: Reagent): void {
        this.reagents.push(newReagent);
    }
    
    public deleteReagent(id: number) {
        const index: number = this.reagents.indexOf(this.getReagent(id));
        if (index !== -1) {
            this.reagents.splice(index, 1);
        }
    }
    
    public updateReagent(newReagent: Reagent): void {
        var reagent = this.getReagent(newReagent.id);
        reagent.name = newReagent.name;
        reagent.concentration = newReagent.concentration;
        reagent.unit = newReagent.unit;
        reagent.boundary = newReagent.boundary;
        reagent.constant = newReagent.constant;
    }
    
    public getNextReagentId(): number {
        var max: number = 1;
        for(let reagent of this.reagents) {
            if(reagent.id > max) {
                max = reagent.id;
            }
        }
        return max+1;
    }

    /* -------------------- Replicas -------------------- */

    public getReplicates(): Replicate[] {
        return this.replicates;
    }

}