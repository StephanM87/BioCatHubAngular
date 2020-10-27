import { Component, OnInit } from '@angular/core';
import { EnzymeService } from 'src/app/service/enzyme.service';
import { Enzyme, Reaction, Reactant } from '../../model/biocatalysis';
import { EnzymeSearch, ReactionSearch } from '../../model/serviceresult';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-enzyme',
  templateUrl: './enzyme.component.html',
  styleUrls: ['./enzyme.component.css']
})
export class EnzymeComponent implements OnInit {

  // Filterung
  public loading: boolean;
  public searchInput: string;
  public closeButton: boolean;
  public enzymeList: EnzymeSearch[];
  public dropdown: boolean;

  // reactions
  public reactionModal: boolean;
  public selectedReaction: ReactionSearch;
  public reactionList: ReactionSearch[];
  public modalEnzyme: Enzyme;

  constructor(public dataService: DataService, public enzymeService: EnzymeService) {
    this.enzymeList = new Array<EnzymeSearch>();
    this.loading = false;
  }

  ngOnInit(): void {}

  // Zentraler Zugriff auf die Enzyme über den Data-Service
  public getEnzymes(): Enzyme[] {
    return this.dataService.getExperiment().getEnzymes();
  }

  public newEnzyme(): void {
    this.getEnzymes().push(new Enzyme());
  }

  // Buttons in der Enzyme Card
  public deleteReaction(enzyme: Enzyme): void {
    enzyme.reaction = new Reaction();
  }

  public deleteEnzyme(enzyme: Enzyme) {
    this.dataService.getExperiment().deleteEnzyme(enzyme);
  }

  // Methoden für die Enzyme Suche
  public filterSearchInput(searchValue: string): void {
    if(searchValue.trim().length == 0){
      this.resetSearch();
    } else {
      this.closeButton = true;
      this.dropdown = true;
      this.enzymeService.getEnzymeSearchList(searchValue).subscribe(
        data => {
          this.enzymeList = data;
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  public resetSearch(): void {
    this.searchInput = "";
    this.closeButton = false;
    this.dropdown = false;
  }

  public selectSearchEnzyme(selected: EnzymeSearch): void {
    this.loading = true;
    this.resetSearch();
    let enzyme = new Enzyme();
    enzyme.ecNumber = selected.ecNumber;
    enzyme.brendaLink = selected.brendaLink;
    this.enzymeService.getEnzymeSpecification(selected.ecNumber).subscribe(
      specification => {
        enzyme.name = specification.enzymeName;
        enzyme.reaction = specification.reaction ? specification.reaction : new Reaction();
        this.getEnzymes().push(enzyme);
        this.loading = false;
      },
      error => {
        console.log(error);
        this.loading = false;
      }
    );
  }

  public reactionSelection(enzyme: Enzyme): void {
    this.loading = true;
    this.modalEnzyme = enzyme;
    this.enzymeService.getReactionSearchList(enzyme.ecNumber).subscribe(
      result => {
        this.reactionList = result;
        this.loading = false;
        this.reactionModal = true;
      },
      error => {
        console.log(error);
        this.loading = false;
      }
    );
  }

  public addReaction(): void {
    this.loading = true;
    this.enzymeService.getReactionSpecification(this.selectedReaction.id).subscribe(
      reaction => {
        this.modalEnzyme.reaction = reaction;
        this.reactionModal = false;
        this.loading = false;
      },
      error => {
        console.log(error);
        this.reactionModal = false;
        this.loading = false;
      }
    );
  }

  // Reaktions Editor
  public addSubstrate(enzyme: Enzyme): void {
    enzyme.reaction.educts.push(new Reactant());
  }
  public deleteSubstrate(enzyme: Enzyme): void {
    if(enzyme.reaction.educts.length > 0){
      enzyme.reaction.educts.pop();
    }
  }
  public addProduct(enzyme: Enzyme): void {
    enzyme.reaction.products.push(new Reactant());
  }
  public deleteProduct(enzyme: Enzyme): void {
    if(enzyme.reaction.products.length > 0){
      enzyme.reaction.products.pop();
    }
  }

}
