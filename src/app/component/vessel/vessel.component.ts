import { Component, OnInit } from '@angular/core';
import { Attribute, Vessel } from '../../model/biocatalysis';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-vessel',
  templateUrl: './vessel.component.html',
  styleUrls: ['./vessel.component.css', '../../../assets/styles/form-styles.css']
})
export class VesselComponent implements OnInit {

  public dropdown: boolean;
  public attributes: string[] = ['attribute 1', 'attribute 2', 'attribute 3', 'attribute 4'];
  public progress: string;
  public progressSuccess: boolean;

  constructor(public dataService: DataService) {
    this.progress = "0";
    this.progressSuccess = false;
  }

  ngOnInit(): void {
    this.updateProgress();
  }
  
  public getVessel(): Vessel {
    return this.dataService.getExperiment().getVessel();
  }
  
  public addAttribute(): void {
    this.getVessel().others.push(new Attribute());
    this.updateProgress();
  }

  public deleteAttribute(other: Attribute): void {
    let index = this.getVessel().others.indexOf(other);
    if (index !== -1) {
      this.getVessel().others.splice(index, 1);
    }
    this.updateProgress()
  }

  public updateProgress() {
    let progressCount = this.dataService.getVesselProgress();
    console.log(progressCount);
    this.progress = progressCount.toFixed();
    console.log(this.progress);
    this.progressSuccess = (this.progress == "100");
  }

}

