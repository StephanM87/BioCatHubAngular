import { Enzyme, Reagent, Replicate, Vessel } from './biocatalysis';

export class Experiment {
    id: number;
    vessel: Vessel;
    enzymes: Enzyme[];
    reagents: Reagent[];
    replicates: Replicate[];

    constructor() {
        this.id = undefined;
        this.vessel = undefined;
        this.enzymes = [];
        this.reagents = [];
        this.replicates = [];
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
        enzyme.enzymeName = newEnzyme.enzymeName;
        enzyme.aminoAcidSequence = newEnzyme.aminoAcidSequence;
        enzyme.concentration = newEnzyme.concentration;
        enzyme.hostOrganism = newEnzyme.hostOrganism;
        enzyme.productionOrganism = newEnzyme.productionOrganism;
        enzyme.unit = newEnzyme.unit;
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
        reagent.reagentName = newReagent.reagentName;
        reagent.concentration = newReagent.concentration;
        reagent.unit = newReagent.unit;
        reagent.kind = newReagent.kind;
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

    public getReplicas(): Replicate[] {
        return this.replicates;
    }

}