import { Component, OnInit, Input } from '@angular/core';
import { ExperimentalData, Measurement } from 'src/app/model/biocatalysis';
import { ExperimentService } from 'src/app/service/experiment.service';

@Component({
  selector: 'dashboard-measurement',
  templateUrl: './dashboard-measurement.component.html',
  styleUrls: ['./dashboard-measurement.component.css']
})
export class DashboardMeasurementComponent implements OnInit {
  @Input() experimentalData: ExperimentalData;

  public measurementPlot: Array<any>;

  constructor(public experimentService: ExperimentService) { }

  ngOnInit(): void {
    this.measurementPlot = new Array<any>();
    this.loadMeasurementImage();
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
