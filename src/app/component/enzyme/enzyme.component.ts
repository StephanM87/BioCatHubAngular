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
    this.dataService.addEnzyme(this.newEnzyme);
    this.resetNewEnzyme();
  }

  public saveEnzyme(): void {
    this.dataService.updateEnzyme(this.newEnzyme);
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
    this.newEnzyme.id = this.dataService.getNextEnzymeId();
    this.showAddButtons();
  }

  public deleteEnzyme(id: number) {
    this.dataService.deleteEnzyme(id);
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
    this.newEnzyme.id = this.dataService.getNextEnzymeId();
  }

  copyEnzymeToDialog(id: number): void {
    var enzyme = this.dataService.getEnzyme(id);
    this.newEnzyme.id = enzyme.id;
    this.newEnzyme.enzymeName = enzyme.enzymeName;
    this.newEnzyme.aminoAcidSequence = enzyme.aminoAcidSequence;
    this.newEnzyme.concentration = enzyme.concentration;
    this.newEnzyme.hostOrganism = enzyme.hostOrganism;
    this.newEnzyme.productionOrganism = enzyme.productionOrganism;
    this.newEnzyme.unit = enzyme.unit;
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
