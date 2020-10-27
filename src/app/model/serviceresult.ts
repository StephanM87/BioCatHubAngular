import { Reaction, Ligand } from './biocatalysis';

// BRENDA
export interface EnzymeSearch {
    ecNumber: string;
    enzymeName: string;
    brendaLink: string;
}

export interface EnzymeSpecification {
    ecNumber: string;
    enzymeName: string;
    reaction: Reaction;
}


// Sabio-RK
export interface ReactionSearch {
    id: string;
    value: string;
}

export interface ReactionSpecification {
    educts: Array<Ligand>;
    products: Array<Ligand>;
}


// zenodo
export interface Deposition {
    id: string;
    title: string;
    date: string;
    name: string;
    affiliation: string;
    link: string;
}

export interface Upload {
    id: string;
    bucket: string;
    zenodoLink: string;
}
