import { Component, OnInit } from '@angular/core';
import { Attribute, Vessel } from '../../model/biocatalysis';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-vessel',
  templateUrl: './vessel.component.html',
  styleUrls: ['./vessel.component.css']
})
export class VesselComponent implements OnInit {

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
  }
  
  public getVessel(): Vessel {
    return this.dataService.getExperiment().getVessel();
  }

  // Attribute
  public addAttribute(): void {
    this.getVessel().others.push(new Attribute());
  }

  public deleteAttribute(other: Attribute): void {
    let index = this.getVessel().others.indexOf(other);
    if (index !== -1) {
      this.getVessel().others.splice(index, 1);
    }
  }

}
