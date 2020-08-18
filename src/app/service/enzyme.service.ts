import { Injectable } from '@angular/core';
import { Enzyme } from '../model/biocatalysis';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const TEST_ENZYMES: Enzyme[] = [
  {id: 101, name: "alcohol dehydrogenase", sequence: "Amino Acid 1", concentration: "Concentraition 1", unit: "mmol/L", boundary: false, constant: false},
  {id: 102, name: "alcohol dehydrogenase (NADP+)", sequence: "Amino Acid 2", concentration: "Concentraition 2", unit: "mmol/L", boundary: false, constant: false},
  {id: 103, name: "(S)-specific secondary alcohol dehydrogenase", sequence: "Amino Acid 3", concentration: "Concentraition 3", unit: "mmol/L", boundary: false, constant: false},
  {id: 104, name: "homoserine dehydrogenase", sequence: "Amino Acid 4", concentration: "Concentraition 4", unit: "mmol/L", boundary: false, constant: false},
  {id: 105, name: "(R)-specific secondary alcohol dehydrogenase (NADH)", sequence: "Amino Acid 5", concentration: "Concentraition 4", unit: "mmol/L", boundary: false, constant: false},
  {id: 106, name: "(R,R)-butanediol dehydrogenase", sequence: "Amino Acid 5", concentration: "Concentraition 5", unit: "mmol/L", boundary: false, constant: false},
  {id: 107, name: "acetoin dehydrogenase", sequence: "Amino Acid 5", concentration: "Concentraition 5", unit: "mmol/L", boundary: false, constant: false},
  {id: 108, name: "glycerol dehydrogenase", sequence: "Amino Acid 5", concentration: "Concentraition 5", unit: "mmol/L", boundary: false, constant: false},
  {id: 109, name: "propanediol-phosphate dehydrogenase", sequence: "Amino Acid 5", concentration: "Concentraition 5", unit: "mmol/L", boundary: false, constant: false},
  {id: 110, name: "glycerol-3-phosphate dehydrogenase (NAD+)", sequence: "Amino Acid 5", concentration: "Concentraition 5", unit: "mmol/L", boundary: false, constant: false},
  {id: 111, name: "D-xylulose reductase", sequence: "Amino Acid 5", concentration: "Concentraition 5", unit: "mmol/L", boundary: false, constant: false},
  {id: 112, name: "L-xylulose reductase", sequence: "Amino Acid 5", concentration: "Concentraition 5", unit: "mmol/L", boundary: false, constant: false},
  {id: 113, name: "D-arabinitol 4-dehydrogenase", sequence: "Amino Acid 5", concentration: "Concentraition 5", unit: "mmol/L", boundary: false, constant: false},
  {id: 114, name: "L-arabinitol 4-dehydrogenase", sequence: "Amino Acid 5", concentration: "Concentraition 5", unit: "mmol/L", boundary: false, constant: false},
  {id: 115, name: "L-arabinitol 2-dehydrogenase", sequence: "Amino Acid 5", concentration: "Concentraition 5", unit: "mmol/L", boundary: false, constant: false},
  {id: 116, name: "L-iditol 2-dehydrogenase", sequence: "Amino Acid 5", concentration: "Concentraition 5", unit: "mmol/L", boundary: false, constant: false},
  {id: 117, name: "D-iditol 2-dehydrogenase", sequence: "Amino Acid 5", concentration: "Concentraition 5", unit: "mmol/L", boundary: false, constant: false},
  {id: 118, name: "galactitol 2-dehydrogenase", sequence: "Amino Acid 5", concentration: "Concentraition 5", unit: "mmol/L", boundary: false, constant: false}
];

@Injectable({
  providedIn: 'root'
})

export class EnzymeService {

  private enzymes: Enzyme[];

  private serverUrl = 'https://www.brenda-enzymes.org/livesearch.php';
  private enzymeSearchParam = 'enzymeName';

  constructor(private client: HttpClient) {
    this.enzymes =TEST_ENZYMES;
  }

  public search(enzyme: string): string[] {
    const livesearchUrl = this.serverUrl + "?" + this.enzymeSearchParam + "=" + enzyme;
    const options = { headers: new HttpHeaders({
      'Content-type': 'text/html',
    })};
    var searchResult: string[] = [];
    this.client.get(livesearchUrl, options).subscribe(data => {
      console.log(data);
    }, error => {
      console.log('Error beim Service Aufruf');
    });
    return searchResult;
  }

  public searchEnzymes(searchInput: string): Enzyme[] {
    return this.enzymes;
  }

  public getEnzymes(): Enzyme[] {
    return this.enzymes;
  }

}
