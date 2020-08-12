import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Reagent } from '../../model/reagent';
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

  public getReagents(): Reagent[] {
    return this.dataService.getReagents();
  }

  public addReagentToList(): void {
    this.dataService.addReagent(this.newReagent);
    this.resetNewReagent();
  }

  public saveReagent(): void {
    this.dataService.updateReagent(this.newReagent);
    this.resetNewReagent();
    this.showAddButtons();
  }

  public cancelEdit(): void {
    this.resetNewReagent();
    this.showAddButtons();
  }

  public editReagent(id: number) {
    this.copyReagentToDialog(id);
    this.showEditButtons();
  }

  public copyReagent(id: number) {
    this.copyReagentToDialog(id);
    this.newReagent.id = this.dataService.getNextReagentId();
    this.showAddButtons();
  }

  public deleteReagent(id: number) {
    this.dataService.deleteReagent(id);
  }

  resetNewReagent(): void {
    this.newReagent = {
      id: undefined, 
      reagentName: undefined,  
      concentration: undefined, 
      unit: undefined, 
      kind: undefined }
    this.newReagent.id = this.dataService.getNextReagentId();
  }

  copyReagentToDialog(id: number): void {
    var reagent = this.dataService.getReagent(id);
    this.newReagent.id = reagent.id;
    this.newReagent.reagentName = reagent.reagentName;
    this.newReagent.concentration = reagent.concentration;
    this.newReagent.unit = reagent.unit;
    this.newReagent.kind = reagent.kind;
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
