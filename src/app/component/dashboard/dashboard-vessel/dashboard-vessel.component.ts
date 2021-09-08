import {Component, Input, OnInit} from '@angular/core';
import {Vessel} from 'src/app/model/biocatalysis';
import {DataService} from 'src/app/service/data.service';

@Component({
  selector: 'app-dashboard-vessel',
  templateUrl: './dashboard-vessel.component.html',
  styleUrls: ['./dashboard-vessel.component.css']
})
export class DashboardVesselComponent implements OnInit {

  @Input() vessel: Vessel;

  public showVesselInformation: boolean;
  public progress: string;

  constructor(public dataService: DataService) {
  }

  ngOnInit(): void {
    this.showVesselInformation =
      this.notNull(this.vessel.type)
      || this.vessel.volume > 0
      || this.notNull(this.vessel.unit)
      || this.vessel.others.length > 0;
    this.progress = this.dataService.getVesselProgress().toFixed();
  }

  notNull(value: string): boolean {
    return (value !== undefined && value.trim().length > 0);
  }

}
