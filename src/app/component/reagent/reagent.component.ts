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

  public newReagent: Reagent;

  public buttonAddVisible: boolean;
  public buttonsEditVisible: boolean;

  constructor(public dataService: DataService) {
    this.resetNewReagent();
    this.showAddButtons();
  }

  ngOnInit(): void {}

  // Zentraler Zugriff auf die Reagents über den Data-Service
  public getReagents(): Reagent[] {
    return this.dataService.getExperiment().getReagents();
  }

  // Buttons in der Reagent Card
  public addReagentToList(): void {
    this.dataService.getExperiment().addReagent(this.newReagent);
    this.resetNewReagent();
  }
  public resetReagent(): void {
    this.resetNewReagent();
  }
  public saveReagent(): void {
    this.dataService.getExperiment().updateReagent(this.newReagent);
    this.resetNewReagent();
    this.showAddButtons();
  }
  public cancelEdit(): void {
    this.resetNewReagent();
    this.showAddButtons();
  }

  // Icon-Buttons in der Enzyme Tabelle
  public editReagent(reagent: Reagent) {
    this.copyReagentToDialog(reagent);
    this.showEditButtons();
  }
  public copyReagent(reagent: Reagent) {
    this.copyReagentToDialog(reagent);
    this.newReagent.id = this.dataService.getExperiment().getNextReagentId();
    this.showAddButtons();
  }
  public deleteReagent(reagent: Reagent) {
    this.dataService.getExperiment().deleteReagent(reagent.id);
  }

  // Setzt die Werte in der Enzyme Card zurück
  resetNewReagent(): void {
    this.newReagent = new Reagent();
    this.newReagent.id = this.dataService.getExperiment().getNextReagentId();
  }

  // Kopiert ein Enzym in die Enzyme Card
  copyReagentToDialog(reagent: Reagent): void {
    this.newReagent = new Reagent(reagent);
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

}
