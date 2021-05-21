import { Component, OnInit, Input } from '@angular/core';
import { ExperimentalData } from 'src/app/model/biocatalysis';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'dashboard-measurement',
  templateUrl: './dashboard-measurement.component.html',
  styleUrls: ['./dashboard-measurement.component.css']
})
export class DashboardMeasurementComponent implements OnInit {
  @Input() experimentalData: ExperimentalData;

  public progress: string;

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    this.setProgress();
  }

  setProgress(): void {
    let count = 0;
    let total = 0;
    if(this.experimentalData.measurements != undefined) {
      this.experimentalData.measurements.forEach(measurement => {
        count += this.dataService.getMeasurementProgress(measurement);
        total += 100;
      });
    }
    let progressValue = total > 0 ? (count/total)*100 : 0;
    this.progress = progressValue.toFixed();
  }

}
