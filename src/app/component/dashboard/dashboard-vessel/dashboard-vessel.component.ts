import { Component, OnInit, Input } from '@angular/core';
import { Vessel } from 'src/app/model/biocatalysis';

@Component({
  selector: 'dashboard-vessel',
  templateUrl: './dashboard-vessel.component.html',
  styleUrls: ['./dashboard-vessel.component.css']
})
export class DashboardVesselComponent implements OnInit {
  @Input() vessel: Vessel;
  public showVesselInformation: boolean;

  constructor() { }

  ngOnInit(): void {
    this.showVesselInformation = (this.notNull(this.vessel.type) || this.vessel.volume > 0 || this.notNull(this.vessel.unit) || this.vessel.others.length > 0);
  }

  notNull(value: string): boolean {
    return (value != undefined && value.trim().length > 0);
  }

}
