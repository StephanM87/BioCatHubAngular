import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Enzyme } from '../../model/enzyme'

const TEST_DATA: Enzyme[] = [
  {id: 1, enzymeName: "Enzyme A", aminoAcidSequence: "Amino Acid 1", concentration: "Concentraition 1", hostOrganism: "Host 1", productionOrganism: "Production 1", unit: "mmol/L"},
  {id: 2, enzymeName: "Enzyme B", aminoAcidSequence: "Amino Acid 2", concentration: "Concentraition 2", hostOrganism: "Host 2", productionOrganism: "Production 2", unit: "mmol/L"},
  {id: 3, enzymeName: "Enzyme C", aminoAcidSequence: "Amino Acid 3", concentration: "Concentraition 3", hostOrganism: "Host 3", productionOrganism: "Production 3", unit: "mmol/L"},
  {id: 4, enzymeName: "Enzyme D", aminoAcidSequence: "Amino Acid 4", concentration: "Concentraition 4", hostOrganism: "Host 4", productionOrganism: "Production 4", unit: "mmol/L"},
  {id: 5, enzymeName: "Enzyme E", aminoAcidSequence: "Amino Acid 5", concentration: "Concentraition 5", hostOrganism: "Host 5", productionOrganism: "Production 5", unit: "mmol/L"}
];

@Component({
  selector: 'app-enzyme',
  templateUrl: './enzyme.component.html',
  styleUrls: ['./enzyme.component.css']
})
export class EnzymeComponent implements OnInit {

  public newEnzyme: Enzyme;
  public enzymeList: Enzyme[];

  public buttonAddVisible: boolean;
  public buttonsEditVisible: boolean;

  constructor() {
    this.enzymeList = TEST_DATA;
    this.resetNewEnzyme();
    this.showAddButtons();
   }

  ngOnInit(): void {
  }

  public addEnzymeToList(): void {
    this.enzymeList.push(this.newEnzyme);
    this.resetNewEnzyme();
  }

  public saveEnzyme(): void {
    for(let enzyme of this.enzymeList) {
      if(enzyme.id == this.newEnzyme.id) {
        enzyme.enzymeName = this.newEnzyme.enzymeName;
        enzyme.aminoAcidSequence = this.newEnzyme.aminoAcidSequence;
        enzyme.concentration = this.newEnzyme.concentration;
        enzyme.hostOrganism = this.newEnzyme.hostOrganism;
        enzyme.productionOrganism = this.newEnzyme.productionOrganism;
        enzyme.unit = this.newEnzyme.unit;
      }
    }
    this.resetNewEnzyme();
    this.showAddButtons();
  }

  public cancelEdit(): void {
    this.resetNewEnzyme();
    this.showAddButtons();
  }

  public editEnzyme(id: number) {
    this.copyEnzymeToDialog(id);
    this.showEditButtons();
  }

  public copyEnzyme(id: number) {
    this.copyEnzymeToDialog(id);
    this.newEnzyme.id = this.getNextId();
    this.showAddButtons();
  }

  public deleteEnzyme(id: number) {
    for(let enzyme of this.enzymeList) {
      if(id == enzyme.id) {
        const index: number = this.enzymeList.indexOf(enzyme);
        if (index !== -1) {
          this.enzymeList.splice(index, 1);
        }
      }
    }
  }

  resetNewEnzyme(): void {
    this.newEnzyme = {
      id: undefined, 
      enzymeName: undefined, 
      aminoAcidSequence: undefined, 
      concentration: undefined, 
      hostOrganism: undefined, 
      productionOrganism: undefined, 
      unit: undefined }
    this.newEnzyme.id = this.getNextId();
  }

  copyEnzymeToDialog(id: number): void {
    for(let enzyme of this.enzymeList) {
      if(id == enzyme.id) {
        this.newEnzyme.id = enzyme.id;
        this.newEnzyme.enzymeName = enzyme.enzymeName;
        this.newEnzyme.aminoAcidSequence = enzyme.aminoAcidSequence;
        this.newEnzyme.concentration = enzyme.concentration;
        this.newEnzyme.hostOrganism = enzyme.hostOrganism;
        this.newEnzyme.productionOrganism = enzyme.productionOrganism;
        this.newEnzyme.unit = enzyme.unit;
      }
    }
  }

  getNextId(): number {
    var max: number = 1;
    for(let enzyme of this.enzymeList) {
      if(enzyme.id > max) {
        max = enzyme.id;
      }
    }
    return max+1;
  }

  showAddButtons(): void {
    this.buttonAddVisible = true;
    this.buttonsEditVisible = false;
  }

  showEditButtons(): void {
    this.buttonAddVisible = false;
    this.buttonsEditVisible = true;
  }

}
