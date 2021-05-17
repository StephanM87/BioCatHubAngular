import { Measurement } from '../model/biocatalysis';

export class AdditionalExperiment {
    title: string;
    parameter: Parameter;
    measurement: Measurement;

    constructor(AdditionalExperiment? : AdditionalExperiment) {
        this.title = AdditionalExperiment?.title || undefined;
        this.parameter = AdditionalExperiment?.parameter || new Parameter;
        this.measurement = AdditionalExperiment?.measurement || new Measurement;
    }
}

class Parameter {
    name: string;
    reactant: string;
    value: number;
    unit: string;
    constructor(Parameter? : Parameter) {
        this.name = Parameter?.name || undefined;
        this.reactant = Parameter?.reactant || undefined;
        this.value = Parameter?.value || undefined;
        this.unit = Parameter?.unit || "";
    }   
}