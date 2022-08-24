import { Component, OnInit, Input } from '@angular/core';
import { Enzyme, Reactant, Reaction } from 'src/app/model/biocatalysis';
import { ReactionSearch } from 'src/app/model/serviceresult';
import { EnzymeService } from 'src/app/service/enzyme.service';
import {environment} from 'src/environments/environment';

@Component({
  selector: 'reaction-editor',
  templateUrl: './reaction-editor.component.html',
  styleUrls: ['./reaction-editor.component.css', '../../../../assets/styles/form-styles.css']
})
export class ReactionEditorComponent implements OnInit {
  @Input() enzyme: Enzyme;

  public loading: boolean;
  public reactionList: ReactionSearch[];
  public environment = environment

  constructor(public enzymeService: EnzymeService) {
    this.loading = false;
  }

  ngOnInit(): void {
    this.reactionList = this.enzymeService.getReactionSearchList(this.enzyme.ecNumber);
  }  

  public getReactantCount(): number {
    return (this.enzyme.reaction.educts.length + this.enzyme.reaction.products.length);
  }

  // Reaktions Search
  public getEnzymeReactions(): ReactionSearch[] {
    return this.reactionList;
  }
  public selectReaction(selected: ReactionSearch): void {
    this.loading = true;
    this.enzymeService.getReactionSpecification(selected.id).subscribe(
      reaction => {
        this.enzyme.reaction = reaction;
        this.enzyme.reaction.value = selected.value;
        this.loading = false;
      },
      error => {
        console.log(error);
        this.loading = false;
      }
    );
  }

  // Reaktions Editor
  public addReactionSubstrate(): void {
    let reactant = new Reactant();
    reactant.role = 'substrate';
    this.enzyme.reaction.educts.push(reactant);
  }
  public deleteReactionSubstrate(): void {
    if(this.enzyme.reaction.educts.length > 0){
      this.enzyme.reaction.educts.pop();
    }
  }
  public addReactionProduct(): void {
    let reactant = new Reactant();
    reactant.role = 'product';
    this.enzyme.reaction.products.push(reactant);
  }
  public deleteReactionProduct(): void {
    if(this.enzyme.reaction.products.length > 0){
      this.enzyme.reaction.products.pop();
    }
  }

}
