import { Component, OnInit, Input } from '@angular/core';
import { Measurement } from 'src/app/model/biocatalysis';
import { FileService } from 'src/app/service/file.service';

@Component({
  selector: 'dashboard-measurement',
  templateUrl: './dashboard-measurement.component.html',
  styleUrls: ['./dashboard-measurement.component.css']
})
export class DashboardMeasurementComponent implements OnInit {
  @Input() measurement: Measurement;

  public measurementPlot: any;

  constructor(public fileService: FileService) { }

  ngOnInit(): void {
    this.loadMeasurementImage();
  }

  public loadMeasurementImage(): void {
    this.fileService.plotMeasurement(this.measurement).subscribe(
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
