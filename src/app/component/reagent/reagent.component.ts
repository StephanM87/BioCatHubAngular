import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Reagent } from '../../model/reagent'

const TEST_DATA: Reagent[] = [
  {id: 1, reagentName: "Reagent A", concentration: "Concentraition 1", unit: "mmol/L", kind:"Substrate"},
  {id: 2, reagentName: "Reagent B", concentration: "Concentraition 2", unit: "mmol/L", kind:"Substrate"},
  {id: 3, reagentName: "Reagent C", concentration: "Concentraition 3", unit: "mmol/L", kind:"Substrate"},
  {id: 4, reagentName: "Reagent D", concentration: "Concentraition 4", unit: "mmol/L", kind:"Substrate"},
  {id: 5, reagentName: "Reagent E", concentration: "Concentraition 5", unit: "mmol/L", kind:"Substrate"}
];

@Component({
  selector: 'app-reagent',
  templateUrl: './reagent.component.html',
  styleUrls: ['./reagent.component.css']
})
export class ReagentComponent implements OnInit {

  public newReagent: Reagent;
  public reagentList: Reagent[];

  public buttonAddVisible: boolean;
  public buttonsEditVisible: boolean;

  constructor() {
    this.reagentList = TEST_DATA;
    this.resetNewReagent();
    this.showAddButtons();
  }

  ngOnInit(): void {
  }

  public addReagentToList(): void {
    this.reagentList.push(this.newReagent);
    this.resetNewReagent();
  }

  public saveReagent(): void {
    for(let reagent of this.reagentList) {
      if(reagent.id == this.newReagent.id) {
        reagent.reagentName = this.newReagent.reagentName;
        reagent.concentration = this.newReagent.concentration;
        reagent.unit = this.newReagent.unit;
        reagent.kind = this.newReagent.kind;
      }
    }
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
    this.newReagent.id = this.getNextId();
    this.showAddButtons();
  }

  public deleteReagent(id: number) {
    for(let reagent of this.reagentList) {
      if(id == reagent.id) {
        const index: number = this.reagentList.indexOf(reagent);
        if (index !== -1) {
          this.reagentList.splice(index, 1);
        }
      }
    }
  }

  resetNewReagent(): void {
    this.newReagent = {
      id: undefined, 
      reagentName: undefined,  
      concentration: undefined, 
      unit: undefined, 
      kind: undefined }
    this.newReagent.id = this.getNextId();
  }

  copyReagentToDialog(id: number): void {
    for(let reagent of this.reagentList) {
      if(id == reagent.id) {
        this.newReagent.id = reagent.id;
        this.newReagent.reagentName = reagent.reagentName;
        this.newReagent.concentration = reagent.concentration;
        this.newReagent.unit = reagent.unit;
        this.newReagent.kind = reagent.kind;
      }
    }
  }

  getNextId(): number {
    var max: number = 1;
    for(let reagent of this.reagentList) {
      if(reagent.id > max) {
        max = reagent.id;
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