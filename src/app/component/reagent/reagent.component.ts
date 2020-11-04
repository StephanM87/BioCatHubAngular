import { Component, OnInit } from '@angular/core';
import { Enzyme, Reactant, Reaction } from '../../model/biocatalysis';
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

  public getReactantCount(reaction: Reaction): number {
    return (reaction.educts.length + reaction.products.length);
  }
  
  // Reactant Tabelle
  public editReagent(reagent: Reactant) {
    this.dialogReagent = reagent;
    this.dialogVisible = true;
  }
  public hideDialog(): void {
    this.dialogReagent = undefined;
    this.dialogVisible = false;
  }
  public deleteEduct(enzyme: Enzyme, educt: Reactant) {
    this.dataService.deleteReactant(enzyme.reaction.educts, educt);
  }
  public deleteProduct(enzyme: Enzyme, product: Reactant) {
    this.dataService.deleteReactant(enzyme.reaction.products, product);
  }

  // Reaktions Search
  public getEnzymeReactions(ecNumber: string): ReactionSearch[] {
    return this.enzymeService.getReactionSearchList(ecNumber);
  }
  public selectReaction(enzyme: Enzyme, selected: ReactionSearch): void {
    this.loading = true;
    this.enzymeService.getReactionSpecification(selected.id).subscribe(
      reaction => {
        enzyme.reaction = reaction;
        enzyme.reaction.value = selected.value;
        this.loading = false;
      },
      error => {
        console.log(error);
        this.loading = false;
      }
    );
  }

  // Reaktions Editor
  public deleteReaction(enzyme: Enzyme): void {
    enzyme.reaction = new Reaction();
  }
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
