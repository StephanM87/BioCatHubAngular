import { Component, OnInit, Input } from '@angular/core';
import { Measurement } from 'src/app/model/biocatalysis';
import { DataService } from 'src/app/service/data.service';
import { FileService } from 'src/app/service/file.service';

@Component({
  selector: 'measurement-detail',
  templateUrl: './measurement-detail.component.html',
  styleUrls: ['./measurement-detail.component.css', '../../../../assets/styles/form-styles.css']
})
export class MeasurementDetailComponent implements OnInit {
  @Input() measurement: Measurement;

  public measurementPlot: any;

  constructor(public dataService: DataService, public fileService: FileService) { }

  ngOnInit(): void {
    if(this.measurement.replicates.length > 0) {
      this.loadMeasurementImage();
    }
  }

  public deleteMeasurement(): void {
    let index = this.dataService.getExperiment().getMeasurements().indexOf(this.measurement);
    if (index !== -1) {
      this.dataService.getExperiment().getMeasurements().splice(index, 1);
    }
  }

  public loadMeasurementImage(): void {
    this.fileService.plotMeasurement(this.measurement).subscribe(
      blob => {
        this.measurementPlot = this.createImageFromBlob(blob);
      },
      error => {
        this.showError(error);
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

  public showError(error: any): void {
    console.log(error);
  }

  public updateImage(): void {
    this.loadMeasurementImage();
  }

}
