import { Injectable } from '@angular/core';
import { Enzyme } from '../model/enzyme';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const TEST_ENZYMES: Enzyme[] = [
  {id: 101, enzymeName: "alcohol dehydrogenase", aminoAcidSequence: "Amino Acid 1", concentration: "Concentraition 1", hostOrganism: "Host 1", productionOrganism: "Production 1", unit: "mmol/L"},
  {id: 102, enzymeName: "alcohol dehydrogenase (NADP+)", aminoAcidSequence: "Amino Acid 2", concentration: "Concentraition 2", hostOrganism: "Host 2", productionOrganism: "Production 2", unit: "mmol/L"},
  {id: 103, enzymeName: "(S)-specific secondary alcohol dehydrogenase", aminoAcidSequence: "Amino Acid 3", concentration: "Concentraition 3", hostOrganism: "Host 3", productionOrganism: "Production 3", unit: "mmol/L"},
  {id: 104, enzymeName: "homoserine dehydrogenase", aminoAcidSequence: "Amino Acid 4", concentration: "Concentraition 4", hostOrganism: "Host 4", productionOrganism: "Production 4", unit: "mmol/L"},
  {id: 105, enzymeName: "(R)-specific secondary alcohol dehydrogenase (NADH)", aminoAcidSequence: "Amino Acid 5", concentration: "Concentraition 5", hostOrganism: "Host 5", productionOrganism: "Production 5", unit: "mmol/L"},
  {id: 106, enzymeName: "(R,R)-butanediol dehydrogenase", aminoAcidSequence: "Amino Acid 5", concentration: "Concentraition 5", hostOrganism: "Host 5", productionOrganism: "Production 5", unit: "mmol/L"},
  {id: 107, enzymeName: "acetoin dehydrogenase", aminoAcidSequence: "Amino Acid 5", concentration: "Concentraition 5", hostOrganism: "Host 5", productionOrganism: "Production 5", unit: "mmol/L"},
  {id: 108, enzymeName: "glycerol dehydrogenase", aminoAcidSequence: "Amino Acid 5", concentration: "Concentraition 5", hostOrganism: "Host 5", productionOrganism: "Production 5", unit: "mmol/L"},
  {id: 109, enzymeName: "propanediol-phosphate dehydrogenase", aminoAcidSequence: "Amino Acid 5", concentration: "Concentraition 5", hostOrganism: "Host 5", productionOrganism: "Production 5", unit: "mmol/L"},
  {id: 110, enzymeName: "glycerol-3-phosphate dehydrogenase (NAD+)", aminoAcidSequence: "Amino Acid 5", concentration: "Concentraition 5", hostOrganism: "Host 5", productionOrganism: "Production 5", unit: "mmol/L"},
  {id: 111, enzymeName: "D-xylulose reductase", aminoAcidSequence: "Amino Acid 5", concentration: "Concentraition 5", hostOrganism: "Host 5", productionOrganism: "Production 5", unit: "mmol/L"},
  {id: 112, enzymeName: "L-xylulose reductase", aminoAcidSequence: "Amino Acid 5", concentration: "Concentraition 5", hostOrganism: "Host 5", productionOrganism: "Production 5", unit: "mmol/L"},
  {id: 113, enzymeName: "D-arabinitol 4-dehydrogenase", aminoAcidSequence: "Amino Acid 5", concentration: "Concentraition 5", hostOrganism: "Host 5", productionOrganism: "Production 5", unit: "mmol/L"},
  {id: 114, enzymeName: "L-arabinitol 4-dehydrogenase", aminoAcidSequence: "Amino Acid 5", concentration: "Concentraition 5", hostOrganism: "Host 5", productionOrganism: "Production 5", unit: "mmol/L"},
  {id: 115, enzymeName: "L-arabinitol 2-dehydrogenase", aminoAcidSequence: "Amino Acid 5", concentration: "Concentraition 5", hostOrganism: "Host 5", productionOrganism: "Production 5", unit: "mmol/L"},
  {id: 116, enzymeName: "L-iditol 2-dehydrogenase", aminoAcidSequence: "Amino Acid 5", concentration: "Concentraition 5", hostOrganism: "Host 5", productionOrganism: "Production 5", unit: "mmol/L"},
  {id: 117, enzymeName: "D-iditol 2-dehydrogenase", aminoAcidSequence: "Amino Acid 5", concentration: "Concentraition 5", hostOrganism: "Host 5", productionOrganism: "Production 5", unit: "mmol/L"},
  {id: 118, enzymeName: "galactitol 2-dehydrogenase", aminoAcidSequence: "Amino Acid 5", concentration: "Concentraition 5", hostOrganism: "Host 5", productionOrganism: "Production 5", unit: "mmol/L"}
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
