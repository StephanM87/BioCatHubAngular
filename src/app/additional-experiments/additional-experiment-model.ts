import { Measurement } from '../model/biocatalysis';

export class AdditionalExperiment {
    title: string;
    changedparameter: string;
    reactantofparameter: string;
    changedvalue: number;
    unit: string;
    measurement: Measurement;

    constructor(AdditionalExperiment? : AdditionalExperiment) {
        this.title = AdditionalExperiment?.title || undefined;
        this.changedparameter = AdditionalExperiment?.changedparameter || undefined;
        this.changedvalue = AdditionalExperiment?.changedvalue || undefined;
        this.unit = AdditionalExperiment?.unit || "";
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