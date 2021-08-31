import { Component, OnInit } from '@angular/core';
import { ReactionPlaceholder } from 'src/properties/placeholder';
import { Attribute, Condition, SolventSpec } from '../../../model/biocatalysis';
import { DataService } from '../../../service/data.service';

@Component({
  selector: 'app-aqueous',
  templateUrl: './aqueous.component.html',
  styleUrls: ['./aqueous.component.css']
})
export class AqueousComponent implements OnInit {
  public attributes: string[] = ['attribute 1', 'attribute 2', 'attribute 3', 'attribute 4'];
  public placeholder = ReactionPlaceholder;

  constructor(public dataService: DataService) { }

  ngOnInit(): void { }
  
  public getReaction(): Condition {
    return this.dataService.getExperiment().getReactionConditions();
  }
  

  addSolvent():void {
    let solvent = new SolventSpec()
    this.getReaction().solvent.aqueous.push(solvent)
    console.log(this.getReaction())
  }


  public addAttribute(): void {
    this.getReaction().others.push(new Attribute());
  }

    public deleteAttribute(other: Attribute): void {
    let index = this.getReaction().others.indexOf(other);
    if (index !== -1) {
      this.getReaction().others.splice(index, 1);
    }
  }

  public getProgress(): string {
    return this.dataService.getConditionProgress().toFixed();
  }

}
