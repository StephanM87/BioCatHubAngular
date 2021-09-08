import {Component} from '@angular/core';
import {VesselPlaceholder} from 'src/properties/placeholder';
import {DataService} from '../../service/data.service';
import {Vessel} from '../../model/vessel';
import {Attribute} from '../../model/attribute';

@Component({
  selector: 'app-vessel',
  templateUrl: './vessel.component.html',
  styleUrls: ['./vessel.component.css', '../../../assets/styles/form-styles.css']
})
export class VesselComponent {

  public dropdown: boolean; // TODO not used, can we delete this?
  public attributes: string[] = ['attribute 1', 'attribute 2', 'attribute 3', 'attribute 4'];
  public placeholder = VesselPlaceholder;

  constructor(public dataService: DataService) {
  }

  public getVessel(): Vessel {
    return this.dataService.getExperiment().getVessel();
  }

  public addAttribute(): void {
    this.getVessel().others.push(new Attribute());
  }

  public deleteAttribute(other: Attribute): void {
    const index = this.getVessel().others.indexOf(other);
    if (index !== -1) {
      this.getVessel().others.splice(index, 1);
    }
  }

  public getProgress(): string {
    const progress = this.dataService.getVesselProgress();
    return progress.toFixed();
  }

}

