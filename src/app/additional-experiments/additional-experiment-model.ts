import { Measurement } from '../model/biocatalysis';

export class AdditionalExperiment {
    changedparameter: string;
    reactantofparameter: string;
    changedvalue: number;
    unit: string;
    measurement: Measurement;

    constructor(AdditionalExperiment? : AdditionalExperiment) {
        this.changedparameter = AdditionalExperiment?.changedparameter || undefined;
        this.changedvalue = AdditionalExperiment?.changedvalue || undefined;
        this.unit = AdditionalExperiment?.unit || undefined;
        this.measurement = AdditionalExperiment?.measurement || new Measurement;
    }
}


export class Plot {
    data: Array<Datarows> ;
    layout: Layout;
}

class Datarows {
    x: Array<number>;
    y: Array<Array<number>>;
    type: string;
    mode: string;
    name: string;
}

class Layout {
    title: Title;
    xaxis: Xaxis;
    yaxis: Yaxis;
}

class Xaxis{
    title: Title;
}

class Yaxis{
    title: Title;
}

class Title {
    text: string;
}