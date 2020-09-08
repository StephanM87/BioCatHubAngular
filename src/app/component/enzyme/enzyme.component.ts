import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Enzyme, EnzymeSearch } from '../../model/biocatalysis';
import { DataService } from '../../service/data.service';

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
  public enzymeList: EnzymeSearch[];
  public dropdown: boolean;

  constructor(public dataService: DataService) {
    this.resetNewEnzyme();
    this.showAddButtons();
    this.enzymeList = new Array<EnzymeSearch>();
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
    this.newEnzyme = new Enzyme();
    this.newEnzyme.id = this.dataService.getExperiment().getNextEnzymeId();
  }

  // Kopiert ein Enzym in die Enzyme Card
  copyEnzymeToDialog(enzyme: Enzyme): void {
    this.newEnzyme = new Enzyme(enzyme);
  }

  // TODO: Validierung der Input Felder
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
    this.newEnzyme.name = searchValue;
    if(searchValue.length > 2) {
      this.enzymeList = this.dataService.getEnzymeSearchList(searchValue);
    }
    this.dropdown = this.enzymeList.length > 0;
  }

  public selectEnzyme(selected: EnzymeSearch): void {
    this.newEnzyme.ecNumber = selected.ecNumber;
    this.newEnzyme.name = selected.enzymeName;
    this.newEnzyme.brendaLink = selected.brendaLink;
  }

}
