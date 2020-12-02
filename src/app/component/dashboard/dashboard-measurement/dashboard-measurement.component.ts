import { Component, OnInit, Input } from '@angular/core';
import { ExperimentalData, Measurement } from 'src/app/model/biocatalysis';
import { DataService } from 'src/app/service/data.service';
import { ExperimentService } from 'src/app/service/experiment.service';

@Component({
  selector: 'dashboard-measurement',
  templateUrl: './dashboard-measurement.component.html',
  styleUrls: ['./dashboard-measurement.component.css']
})
export class DashboardMeasurementComponent implements OnInit {
  @Input() experimentalData: ExperimentalData;

  public measurementPlot: Array<any>;
  public progress: string;

  constructor(public experimentService: ExperimentService, public dataService: DataService) { }

  ngOnInit(): void {
    this.measurementPlot = new Array<any>();
    this.loadMeasurementImage();
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

  public loadMeasurementImage(): void {
    this.experimentalData.measurements.forEach(measurement => {
      this.experimentService.plotMeasurement(measurement).subscribe(
        blob => {
          this.createImageFromBlob(blob);
        },
        error => {
          console.log(error);
        }
      );
    });
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.measurementPlot.push(reader.result);
    }, false);
    if (image) {
       reader.readAsDataURL(image);
    }
 }

}
