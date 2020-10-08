import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Reagent } from '../../model/biocatalysis';
import { ReagentSearch } from '../../model/serviceresult';
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

  // Filterung
  public loadingReagents: boolean;
  public searchInput: string;
  public closeButton: boolean;
  public reagentList: ReagentSearch[];
  public dropdown: boolean;

  constructor(public dataService: DataService) {
    this.resetNewReagent();
    this.showAddButtons();
    this.reagentList = new Array<ReagentSearch>();
    this.dialogVisible = false;
  }

  ngOnInit(): void {}

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

  // Methoden für die Enzyme Suche
  public filterSearchInput(searchValue: string): void {
    if(searchValue.trim().length == 0){
      this.resetSearch();
    } else {
      this.closeButton = true;
      this.dropdown = true;
      this.loadingReagents = true;
      // Read Reagents from DataService
      this.dataService.getReagentSearchList(searchValue).subscribe(
        data => {
          this.reagentList = data;
          this.loadingReagents = false;
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  public selectSearchReagent(selected: ReagentSearch): void {
    this.resetSearch();
    this.dialogReagent.ligandId = selected.ligandId;
    this.dialogReagent.brendaLink = selected.brendaLink;
    this.dataService.getReagentSpecification(selected.ligandId).subscribe(
      specification => {
        this.dialogReagent.name = specification.reagentName;
        this.dialogReagent.formula = specification.formula;
        this.addReagentToList();
      },
      error => {
        console.log(error);
      }
    );
  }

  public resetSearch(): void {
    this.searchInput = "";
    this.closeButton = false;
    this.loadingReagents = false;
    this.dropdown = false;
  }

}
