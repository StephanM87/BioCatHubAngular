import { Component, OnInit } from '@angular/core';
import { Enzyme, Reactant } from '../../model/biocatalysis';
import { ReactionSearch } from '../../model/serviceresult';
import { DataService } from '../../service/data.service';
import { EnzymeService } from '../../service/enzyme.service';

@Component({
  selector: 'app-reagent',
  templateUrl: './reagent.component.html',
  styleUrls: ['./reagent.component.css']
})
export class ReagentComponent implements OnInit {

  public dialogVisible: boolean;
  public dialogReagent: Reactant;

  public loading: boolean;

  // reactions
  public reactionModal: boolean;
  public selectedReaction: ReactionSearch;
  public reactionList: ReactionSearch[];
  public modalEnzyme: Enzyme;

  constructor(public dataService: DataService, public enzymeService: EnzymeService) {
    this.dialogVisible = false;
    this.loading = false;
  }

  ngOnInit(): void {}

  public getFormula(formula: string): string {
    return this.dataService.getFormulaHtml(formula);
  }
  
  public getEnzymes(): Enzyme[] {
    return this.dataService.getExperiment().getEnzymes();
  }

  public getReactantCount(): number {
    return this.dataService.getReactantCount();
  }
  
  public editReagent(reagent: Reactant) {
    this.dialogReagent = reagent;
    this.dialogVisible = true;
  }

  public deleteEduct(enzyme: Enzyme, educt: Reactant) {
    this.dataService.deleteReactant(enzyme.reaction.educts, educt);
  }

  public deleteProduct(enzyme: Enzyme, product: Reactant) {
    this.dataService.deleteReactant(enzyme.reaction.products, product);
  }

  public hideDialog(): void {
    this.dialogReagent = undefined;
    this.dialogVisible = false;
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
  public addReactionSubstrate(enzyme: Enzyme): void {
    enzyme.reaction.educts.push(new Reactant());
  }
  public deleteReactionSubstrate(enzyme: Enzyme): void {
    if(enzyme.reaction.educts.length > 0){
      enzyme.reaction.educts.pop();
    }
  }
  public addReactionProduct(enzyme: Enzyme): void {
    enzyme.reaction.products.push(new Reactant());
  }
  public deleteReactionProduct(enzyme: Enzyme): void {
    if(enzyme.reaction.products.length > 0){
      enzyme.reaction.products.pop();
    }
  }

}
