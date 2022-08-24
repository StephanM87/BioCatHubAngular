import { Component, OnInit, Input } from '@angular/core';
import { Attribute, Reactant } from 'src/app/model/biocatalysis';
import { DataService } from 'src/app/service/data.service';
import {EnzymeService } from 'src/app/service/enzyme.service';
import { ReactantPlaceholder } from 'src/properties/placeholder';
import {environment} from 'src/environments/environment';
@Component({
  selector: 'reactant-detail',
  templateUrl: './reactant-detail.component.html',
  styleUrls: ['./reactant-detail.component.css', '../../../../assets/styles/form-styles.css']
})
export class ReactantDetailComponent implements OnInit {
  @Input() reactant: Reactant;  
  public attributes: string[] = ['attribute 1', 'attribute 2', 'attribute 3', 'attribute 4'];
  public placeholder = ReactantPlaceholder;
  image
  environment = environment
  constructor(public dataService: DataService, private enz:EnzymeService) { }

  ngOnInit(): void { }

  public addAttribute(): void {
    if(this.reactant.others == undefined) {
      this.reactant.others = new Array<Attribute>();
    }
    this.reactant.others.push(new Attribute());
  }

  public deleteAttribute(other: Attribute): void {
    let index = this.reactant.others.indexOf(other);
    if (index !== -1) {
      this.reactant.others.splice(index, 1);
    }
  }

  getImage(value){
    this.reactant.smiles = value.target.value
    this.image = this.enz.getReactantsImage(value.target.value).subscribe((e)=>{
      console.log(e)
      this.image = e
    })

  }

  public getProgress(): string {
    return this.dataService.getReactantProgress(this.reactant).toFixed();
  }
}
