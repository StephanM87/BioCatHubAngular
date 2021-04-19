import { Component, OnInit } from '@angular/core';
import { VesselPlaceholder } from 'src/properties/placeholder';
import { Attribute, Vessel } from '../../model/biocatalysis';
import { DataService } from '../../service/data.service';
import { VolumeUnitDropdown } from 'src/properties/dropdown';

@Component({
  selector: 'app-vessel',
  templateUrl: './vessel.component.html',
  styleUrls: ['./vessel.component.css', '../../../assets/styles/form-styles.css']
})
export class VesselComponent implements OnInit {

  public dropdown: boolean;
  public attributes: string[] = ['attribute 1', 'attribute 2', 'attribute 3', 'attribute 4'];
  public placeholder = VesselPlaceholder;
  public units = VolumeUnitDropdown;

  constructor(public dataService: DataService) { }

  ngOnInit(): void { }
  
  public getVessel(): Vessel {
    return this.dataService.getExperiment().getVessel();
  }
  
  public addAttribute(): void {
    this.getVessel().others.push(new Attribute());
  }

  public deleteAttribute(other: Attribute): void {
    let index = this.getVessel().others.indexOf(other);
    if (index !== -1) {
      this.getVessel().others.splice(index, 1);
    }
  }

  public getProgress(): string {
    let progress = this.dataService.getVesselProgress();
    return progress.toFixed();
  }

}

