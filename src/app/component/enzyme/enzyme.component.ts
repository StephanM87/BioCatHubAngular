import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Enzyme } from '../../model/biocatalysis';
import { DataService } from '../../service/data.service';
import { EnzymeService } from '../../service/enzyme.service';

@Component({
  selector: 'app-enzyme',
  templateUrl: './enzyme.component.html',
  styleUrls: ['./enzyme.component.css']
})
export class EnzymeComponent implements OnInit {

  // Enzyme Card
  public newEnzyme: Enzyme;

  // Buttons ein-/ausblenden
  public buttonAddVisible: boolean;
  public buttonsEditVisible: boolean;

  // Filterung
  public enzymeList: Enzyme[];
  public searchResult: Enzyme[];
  public dropdown: boolean;

  constructor(public dataService: DataService, public enzymeService: EnzymeService) {
    this.resetNewEnzyme();
    this.showAddButtons();
    this.enzymeList = this.enzymeService.getEnzymes();
   }

  ngOnInit(): void {}

  // Zentraler Zugriff auf die Enzyme über den Data-Service
  public getEnzymes(): Enzyme[] {
    return this.dataService.getExperiment().getEnzymes();
  }

  // Buttons in der Enzyme Card
  public addEnzymeToList(): void {
    if(this.validate()){
      this.dataService.getExperiment().addEnzyme(this.newEnzyme);
      this.resetNewEnzyme();
    }
  }
  public resetEnzyme(): void {
    this.resetNewEnzyme();
  }
  public saveEnzyme(): void {
    if(this.validate()){
      this.dataService.getExperiment().updateEnzyme(this.newEnzyme);
      this.resetNewEnzyme();
      this.showAddButtons();
    }
  }
  public cancelEdit(): void {
    this.resetNewEnzyme();
    this.showAddButtons();
  }

  // Icon-Buttons in der Enzyme Tabelle
  public editEnzyme(enzyme: Enzyme) {
    this.copyEnzymeToDialog(enzyme);
    this.showEditButtons();
  }
  public copyEnzyme(enzyme: Enzyme) {
    this.copyEnzymeToDialog(enzyme);
    this.newEnzyme.id = this.dataService.getExperiment().getNextEnzymeId();
    this.showAddButtons();
  }
  public deleteEnzyme(enzyme: Enzyme) {
    this.dataService.getExperiment().deleteEnzyme(enzyme.id);
  }

  // Setzt die Werte in der Enzyme Card zurück
  resetNewEnzyme(): void {
    this.newEnzyme = {
      id: undefined, 
      enzymeName: undefined, 
      aminoAcidSequence: undefined, 
      concentration: undefined, 
      hostOrganism: undefined, 
      productionOrganism: undefined, 
      unit: undefined }
    this.newEnzyme.id = this.dataService.getExperiment().getNextEnzymeId();
  }

  // Kopiert ein Enzym in die Enzyme Card
  copyEnzymeToDialog(enzyme: Enzyme): void {
    this.newEnzyme.id = enzyme.id;
    this.newEnzyme.enzymeName = enzyme.enzymeName;
    this.newEnzyme.aminoAcidSequence = enzyme.aminoAcidSequence;
    this.newEnzyme.concentration = enzyme.concentration;
    this.newEnzyme.hostOrganism = enzyme.hostOrganism;
    this.newEnzyme.productionOrganism = enzyme.productionOrganism;
    this.newEnzyme.unit = enzyme.unit;
  }

  // Validierung der Input Felder
  public validate(): boolean {
    return true;
  }

  // Ein- und Ausblenden der Buttons in der Enzyme Card
  showAddButtons(): void {
    this.buttonAddVisible = true;
    this.buttonsEditVisible = false;
  }
  showEditButtons(): void {
    this.buttonAddVisible = false;
    this.buttonsEditVisible = true;
  }


  // Methoden für die Enzyme Suche
  public filterSearchInput(searchValue: string): void {
    this.newEnzyme.enzymeName = searchValue;
    this.searchResult = this.enzymeList.filter(function(tag) {
        return tag.enzymeName.indexOf(searchValue) >= 0;
    });
    this.dropdown = this.searchResult.length > 0;
  }
  public selectEnzyme(enzyme: Enzyme): void {
    this.copyEnzymeToDialog(enzyme);
  }

}
