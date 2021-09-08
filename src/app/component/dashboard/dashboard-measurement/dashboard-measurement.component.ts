import {Component, Input, OnInit} from '@angular/core';
import {DataService} from 'src/app/service/data.service';

import {PlotService} from 'src/app/service/plot.service';
import {ExperimentalData} from '../../../model/experimental-data';

@Component({
  selector: 'app-dashboard-measurement',
  templateUrl: './dashboard-measurement.component.html',
  styleUrls: ['./dashboard-measurement.component.css']
})
export class DashboardMeasurementComponent implements OnInit {

  @Input() experimentalData: ExperimentalData;

  public measurementPlot: Array<any>;
  public progress: string;

  constructor(public dataService: DataService,
              public plotService: PlotService) {
  }

  ngOnInit(): void {
    this.measurementPlot = new Array<any>();
    this.loadPlots();
    // this.loadMeasurementImage(); // TODO can this be deleted?
    this.setProgress();
  }

  setProgress(): void {
    let count = 0;
    let total = 0;
    if (this.experimentalData.measurements !== undefined) {
      this.experimentalData.measurements.forEach(measurement => {
        count += this.dataService.getMeasurementProgress(measurement);
        total += 100;
      });
    }
    const progressValue = total > 0 ? (count / total) * 100 : 0;
    this.progress = progressValue.toFixed();
  }

  public loadPlots(): void {
    this.experimentalData.measurements.forEach(measurement => {
      this.measurementPlot.push(this.plotService.loadPlot(measurement));
    });
  }

  public loadMeasurementImage(): void {
    this.experimentalData.measurements.forEach(measurement => {
      this.plotService.loadPlot(measurement);
      /* TODO can this be deleted?
      this.experimentService.plotMeasurement(measurement).subscribe(
        blob => {
          this.createImageFromBlob(blob);
        },
        error => {
          console.log(error);
        }
      );*/
    });
  }

  createImageFromBlob(image: Blob): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.measurementPlot.push(reader.result);
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
  }

}
