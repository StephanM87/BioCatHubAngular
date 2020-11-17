import { Component, OnInit, Input } from '@angular/core';
import { Measurement } from 'src/app/model/biocatalysis';
import { ExperimentService } from 'src/app/service/experiment.service';

@Component({
  selector: 'dashboard-measurement',
  templateUrl: './dashboard-measurement.component.html',
  styleUrls: ['./dashboard-measurement.component.css']
})
export class DashboardMeasurementComponent implements OnInit {
  @Input() measurement: Measurement;

  public measurementPlot: any;

  constructor(public experimentService: ExperimentService) { }

  ngOnInit(): void {
    this.loadMeasurementImage();
  }

  public loadMeasurementImage(): void {
    this.experimentService.plotMeasurement(this.measurement).subscribe(
      blob => {
        this.measurementPlot = this.createImageFromBlob(blob);
      },
      error => {
        console.log(error);
      }
    );
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.measurementPlot = reader.result;
    }, false);
    if (image) {
       reader.readAsDataURL(image);
    }
 }

}
