import { Component, OnInit, Input } from '@angular/core';
import { Attribute, Enzyme } from 'src/app/model/biocatalysis';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'enzyme-detail',
  templateUrl: './enzyme-detail.component.html',
  styleUrls: ['./enzyme-detail.component.css', '../../../../assets/styles/form-styles.css']
})
export class EnzymeDetailComponent implements OnInit {
  @Input() enzyme: Enzyme;

  public progress: string;
 
  public attributes: string[] = ['attribute 1', 'attribute 2', 'attribute 3', 'attribute 4'];

  constructor(public dataService: DataService) {
    this.progress = "0";
  }

  ngOnInit(): void {
    this.updateProgress();
  }

  public addAttribute(): void {
    this.enzyme.others.push(new Attribute());
    this.updateProgress();
  }

  public deleteAttribute(other: Attribute): void {
    let index = this.enzyme.others.indexOf(other);
    if (index !== -1) {
      this.enzyme.others.splice(index, 1);
    }
    this.updateProgress();
  }
  
  public deleteEnzyme() {
    this.dataService.getExperiment().deleteEnzyme(this.enzyme);
  }
  
  public updateProgress() {
    let progressCount = this.dataService.getEnzymeProgress(this.enzyme);
    this.progress = progressCount.toFixed();
  }

}
