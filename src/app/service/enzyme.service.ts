import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnzymeSearch, EnzymeSpecification, ReactionSearch } from '../model/serviceresult';
import { environment } from './../../environments/environment';
import { Reaction } from '../model/biocatalysis';

@Injectable({ providedIn: 'root' })
export class EnzymeService {
  
  private reactions: Map<string, ReactionSearch[]>;;

  constructor(private client: HttpClient) {
    this.reactions = new Map<string, ReactionSearch[]>();
  }

  // Enzymes
  getEnzymeSearchList(enzymeName: string): Observable<Array<EnzymeSearch>> {
    enzymeName = enzymeName.trim();
    const options = enzymeName ? { params: new HttpParams().set('enzymeName', enzymeName) } : {};
    return this.client.get<EnzymeSearch[]>(environment.backendUrl + '/enzyme/list', options);
  }

  getEnzymeSpecification(id: string): Observable<EnzymeSpecification> {
    const options = id ? { params: new HttpParams().set('enzyme', id) } : {};
    return this.client.get<EnzymeSpecification>(environment.backendUrl + '/enzyme', options);
  }


  // Reactions
  addEnzymeReactions(ecNumber: string) : void {
    if(!this.reactions.has(ecNumber)){
      const options = ecNumber ? { params: new HttpParams().set('ecNumber', ecNumber) } : {};
      this.client.get<ReactionSearch[]>(environment.backendUrl + '/reaction/list', options).subscribe(
        list => {
          this.reactions.set(ecNumber, list);
        }
      );
    }
  }

  getReactionSearchList(ecNumber: string) : ReactionSearch[] {
    return this.reactions.get(ecNumber);
  }

  getReactionSpecification(reactionId: string) : Observable<Reaction> {
    const options = reactionId ? { params: new HttpParams().set('reactionId', reactionId) } : {};
    return this.client.get<Reaction>(environment.backendUrl + '/reaction', options);
  }

  getReactantsImage(smiles){
    console.log("JPOOPPPPPPPPPPPPPPP")
    return this.client.get('http://127.0.0.1:8000/CCC')
  }
}
