// BRENDA
export interface EnzymeSearch {
    ecNumber: string;
    enzymeName: string;
    brendaLink: string;
}

export interface ReagentSearch {
    ligandId: string;
    ligandName: string;
    brendaLink: string;
}

export interface Ligand {
    name: string;
    structureId: string;
    imageUrl: string;
}

export interface Reaction {
    value: string;
    educts: Ligand[];
    products: Ligand[];
}

export interface EnzymeSpecification {
    ecNumber: string;
    enzymeName: string;
    reactions: Reaction[];
}

export interface ReagentSpecification {
    ligandId: string;
    reagentName: string;
    formula: string;
}

// Sabio-RK

export interface ReactionSearch {
    id: string;
    value: string;
}

export interface ReactionSpecification {
    id: string;
    name: string;
    role: string;
    schema: string;
    smiles: string;
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