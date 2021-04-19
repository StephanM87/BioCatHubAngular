import { Component, OnInit, Input } from '@angular/core';
import { Attribute, Enzyme } from 'src/app/model/biocatalysis';
import { DataService } from 'src/app/service/data.service';
import { EnzymePlaceholder } from 'src/properties/placeholder';
import { ConcentrationUnitDropdown } from 'src/properties/dropdown';

@Component({
  selector: 'enzyme-detail',
  templateUrl: './enzyme-detail.component.html',
  styleUrls: ['./enzyme-detail.component.css', '../../../../assets/styles/form-styles.css']
})
export class EnzymeDetailComponent implements OnInit {
  @Input() enzyme: Enzyme; 
  public attributes: string[] = ['attribute 1', 'attribute 2', 'attribute 3', 'attribute 4'];
  public placeholder = EnzymePlaceholder;
  public units = ConcentrationUnitDropdown;

  constructor(public dataService: DataService) { }

  ngOnInit(): void { }

  public addAttribute(): void {
    this.enzyme.others.push(new Attribute());
  }

  public deleteAttribute(other: Attribute): void {
    let index = this.enzyme.others.indexOf(other);
    if (index !== -1) {
      this.enzyme.others.splice(index, 1);
    }
  }
  
  public deleteEnzyme() {
    this.dataService.getExperiment().deleteEnzyme(this.enzyme);
  }
  
  public getProgress(): string {
    let progress = this.dataService.getEnzymeProgress(this.enzyme);
    return progress.toFixed();
  }

}
