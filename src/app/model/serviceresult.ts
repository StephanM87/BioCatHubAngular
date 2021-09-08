// TODO one file per class convention

// BRENDA
import {Reaction} from './reaction';

export interface EnzymeSearch {
  ecNumber: string;
  enzymeName: string;
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
  zenodoLink: string;
}
