import { Component, OnInit } from '@angular/core';
import { Enzyme, Reagent } from '../../model/biocatalysis';
import { EnzymeSearch, Reaction } from '../../model/serviceresult';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-enzyme',
  templateUrl: './enzyme.component.html',
  styleUrls: ['./enzyme.component.css']
})
export class EnzymeComponent implements OnInit {

  // Enzyme Dialog
  public dialogVisible: boolean;
  public dialogEnzyme: Enzyme;

  // Buttons ein-/ausblenden
  public buttonAddVisible: boolean;
  public buttonsEditVisible: boolean;

  // Filterung
  public loading: boolean;
  public searchInput: string;
  public closeButton: boolean;
  public enzymeList: EnzymeSearch[];
  public dropdown: boolean;

  constructor(public dataService: DataService) {
    this.resetNewEnzyme();
    this.showAddButtons();
    this.enzymeList = new Array<EnzymeSearch>();
    this.dialogVisible = false;
    this.loading = false;
  }

  ngOnInit(): void {}

  // Zentraler Zugriff auf die Enzyme über den Data-Service
  public getEnzymes(): Enzyme[] {
    return this.dataService.getExperiment().getEnzymes();
  }

  // Buttons in der Enzyme Card
  public addEnzymeToList(): void {
    if(this.validate()){
      this.dataService.getExperiment().addEnzyme(this.dialogEnzyme);
      this.resetNewEnzyme();
      this.hideEnzymeDialog();
    }
  }
  public saveEnzyme(): void {
    if(this.validate()){
      this.resetNewEnzyme();
      this.showAddButtons();
      this.hideEnzymeDialog();
    }
  }
  public cancelEdit(): void {
    this.resetNewEnzyme();
    this.showAddButtons();
    this.hideEnzymeDialog();
  }

  public deleteReaction(reaction: Reaction): void {
    this.dataService.getExperiment().deleteReagentsOfReaction(reaction);
    const index = this.dialogEnzyme.reactions.indexOf(reaction);
    if (index !== -1) {
      this.dialogEnzyme.reactions.splice(index, 1);
    }
  }

  // Icon-Buttons in der Enzyme Tabelle
  public editEnzyme(enzyme: Enzyme) {
    this.dialogEnzyme = enzyme;
    this.showEditButtons();
    this.showEnzymeDialog();
  }
  public copyEnzyme(enzyme: Enzyme) {
    this.copyEnzymeToDialog(enzyme);
    this.showAddButtons();
    this.showEnzymeDialog();
  }
  public deleteEnzyme(enzyme: Enzyme) {
    enzyme.reactions.forEach(reaction => {
      this.dataService.getExperiment().deleteReagentsOfReaction(reaction);
    });
    this.dataService.getExperiment().deleteEnzyme(enzyme);
  }

  // Setzt die Werte in der Enzyme Card zurück
  resetNewEnzyme(): void {
    this.dialogEnzyme = new Enzyme();
  }

  // Kopiert ein Enzym in die Enzyme Card
  copyEnzymeToDialog(enzyme: Enzyme): void {
    this.dialogEnzyme = new Enzyme(enzyme);
  }

  // TODO: Validierung der Input Felder
  public validate(): boolean {
    return true;
  }

  // Ein- und Ausblenden des Enzyme Dialog
  public showAddButtons(): void {
    this.buttonAddVisible = true;
    this.buttonsEditVisible = false;
  }
  public showEditButtons(): void {
    this.buttonAddVisible = false;
    this.buttonsEditVisible = true;
  }
  public showEnzymeDialog(): void {
    this.dialogVisible = true;
  }
  public hideEnzymeDialog(): void {
    this.dialogVisible = false;
  }


  // Methoden für die Enzyme Suche
  public filterSearchInput(searchValue: string): void {
    if(searchValue.trim().length == 0){
      this.resetSearch();
    } else {
      this.closeButton = true;
      this.dropdown = true;
      // Read Enzymes from DataService
      this.dataService.getEnzymeSearchList(searchValue).subscribe(
        data => {
          this.enzymeList = data;
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  public selectSearchEnzyme(selected: EnzymeSearch): void {
    this.loading = true;
    this.resetSearch();
    this.dialogEnzyme.ecNumber = selected.ecNumber;
    this.dialogEnzyme.brendaLink = selected.brendaLink;
    this.dataService.getEnzymeSpecification(selected.ecNumber).subscribe(
      specification => {
        this.dialogEnzyme.name = specification.enzymeName;
        this.dialogEnzyme.reactions = specification.reactions;
        this.addReagentsToExperiment(specification.reactions)
        this.addEnzymeToList();
        this.loading = false;
      },
      error => {
        console.log(error);
        this.loading = false;
      }
    );
  }

  addReagentsToExperiment(reactions: Array<Reaction>): void {
    reactions.forEach(reaction => {
      reaction.educts.forEach(educt => {
        let exsist = this.dataService.getExperiment().hasReagent(educt.structureId);
        if(!exsist) {
          let reagent = new Reagent();
          reagent.ligandId = educt.structureId;
          reagent.name = educt.name;
          reagent.role = 'substrate';
          reagent.imageUrl = educt.imageUrl;
          reagent.brendaLink = educt.imageUrl;
          this.dataService.getExperiment().getReagents().push(reagent);
        }
      });
      reaction.products.forEach(product => {
        let exsist = this.dataService.getExperiment().hasReagent(product.structureId);
        if(!exsist) {
          let reagent = new Reagent();
          reagent.ligandId = product.structureId;
          reagent.name = product.name;
          reagent.role = 'product';
          reagent.imageUrl = product.imageUrl;
          reagent.brendaLink = product.imageUrl;
          this.dataService.getExperiment().getReagents().push(reagent);
        }
      });
    });
  }

  public resetSearch(): void {
    this.searchInput = "";
    this.closeButton = false;
    this.dropdown = false;
  }

}
