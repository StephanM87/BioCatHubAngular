import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Reagent } from '../../model/biocatalysis';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-reagent',
  templateUrl: './reagent.component.html',
  styleUrls: ['./reagent.component.css']
})
export class ReagentComponent implements OnInit {

  // Enzyme Dialog
  public dialogVisible: boolean;
  public dialogReagent: Reagent;

  // Buttons ein-/ausblenden
  public buttonAddVisible: boolean;
  public buttonsEditVisible: boolean;

  private numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  constructor(public dataService: DataService) {
    this.resetNewReagent();
    this.showAddButtons();
    this.dialogVisible = false;
  }

  ngOnInit(): void {}

  public getFormula(formula: string): string {
    let result = '';
    if(formula != undefined) {
      let cahracters = formula.split('');
      cahracters.forEach(char => {
        if (this.numbers.indexOf(char) > -1 ){
          result += '<sub>' + char + '</sub>'; 
        } else {
          result += char; 
        }
      });
    }
    return result;
  }

  // Zentraler Zugriff auf die Reagents über den Data-Service
  public getReagents(): Reagent[] {
    return this.dataService.getExperiment().getReagents();
  }

  // Buttons in der Reagent Card
  public addReagentToList(): void {
    if(this.validate()){
      this.dataService.getExperiment().addReagent(this.dialogReagent);
      this.resetNewReagent();
      this.hideDialog();
    }
  }
  public saveReagent(): void {
    if(this.validate()){
      this.resetNewReagent();
      this.showAddButtons();
      this.hideDialog();
    }
  }
  public cancelEdit(): void {
    this.resetNewReagent();
    this.showAddButtons();
    this.hideDialog();
  }

  // Icon-Buttons in der Enzyme Tabelle
  public editReagent(reagent: Reagent) {
    this.dialogReagent = reagent;
    this.showEditButtons();
    this.showDialog();
  }
  public copyReagent(reagent: Reagent) {
    this.copyReagentToDialog(reagent);
    this.showAddButtons();
    this.showDialog();
  }
  public deleteReagent(reagent: Reagent) {
    this.dataService.getExperiment().deleteReagent(reagent);
  }

  // Setzt die Werte in der Enzyme Card zurück
  resetNewReagent(): void {
    this.dialogReagent = new Reagent();
  }

  // Kopiert ein Enzym in die Enzyme Card
  copyReagentToDialog(reagent: Reagent): void {
    this.dialogReagent = new Reagent(reagent);
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
  public showDialog(): void {
    this.dialogVisible = true;
  }
  public hideDialog(): void {
    this.dialogVisible = false;
  }

}
