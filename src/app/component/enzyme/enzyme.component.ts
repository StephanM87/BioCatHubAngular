import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Enzyme } from '../../model/enzyme';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-enzyme',
  templateUrl: './enzyme.component.html',
  styleUrls: ['./enzyme.component.css']
})
export class EnzymeComponent implements OnInit {

  public newEnzyme: Enzyme;

  public buttonAddVisible: boolean;
  public buttonsEditVisible: boolean;

  constructor(public dataService: DataService) {
    this.resetNewEnzyme();
    this.showAddButtons();
   }

  ngOnInit(): void {}

  public getEnzymes(): Enzyme[] {
    return this.dataService.getEnzymes();
  }

  public addEnzymeToList(): void {
    this.getEnzymes().push(this.newEnzyme);
    this.resetNewEnzyme();
  }

  public saveEnzyme(): void {
    for(let enzyme of this.getEnzymes()) {
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
    for(let enzyme of this.getEnzymes()) {
      if(id == enzyme.id) {
        const index: number = this.getEnzymes().indexOf(enzyme);
        if (index !== -1) {
          this.getEnzymes().splice(index, 1);
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
    for(let enzyme of this.getEnzymes()) {
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
    for(let enzyme of this.getEnzymes()) {
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
