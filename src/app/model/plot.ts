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