import { Component, OnInit } from '@angular/core';
import { Vessel, Measurement, Replicate } from 'src/app/model/biocatalysis';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { DataService } from 'src/app/service/data.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-measurement',
  templateUrl: './measurement.component.html',
  styleUrls: ['./measurement.component.css']
})
export class MeasurementComponent implements OnInit {

  public file: File;
  public measurementUploaded: boolean;
  public measurementPlot: any;

  public measurement: Measurement;
  public vessel: Vessel;

  constructor(public dataService: DataService) {
    this.vessel = dataService.getExperiment().getVessel();
    this.measurement = dataService.getExperiment().getMeasurement();
    this.measurementUploaded = this.measurement.replicates.length > 0;
  }

  ngOnInit(): void {

  }

  public submit(): void {

  }

  public incomingFile(event: any): void {
    this.file = event.target.files[0];
    this.readMeasurementFromFile();
  }

  public uploadFile(): void {
    if(this.file != undefined){
      this.loadMeasurementImage();
      this.measurementUploaded = true;
    }
  }

  public readMeasurementFromFile(): void {
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(this.file);
    reader.onload = (e: any) => {
      /* Workbook */
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });

      /* WorkSheets */
      const firstWorkSheet: XLSX.WorkSheet = wb.Sheets[wb.SheetNames[0]];
      const secondWorkSheet: XLSX.WorkSheet = wb.Sheets[wb.SheetNames[1]];

      /* Replicates */
      const replicatesData = XLSX.utils.sheet_to_json(firstWorkSheet);
      let replicates = new Array<Replicate>();
      replicatesData.forEach(element => {
        let replicate = new Replicate();
        replicate.x_value = element['x_parameter'];
        replicate.y_values.push(element['rep_1']);
        replicate.y_values.push(element['rep_2']);
        replicate.y_values.push(element['rep_3']);
        replicates.push(replicate);
      });
      this.measurement.replicates = replicates;

      /* Measurement */
      const measurementData = XLSX.utils.sheet_to_json(secondWorkSheet);
      if(measurementData.length == 1){
        let element = measurementData[0];
        this.measurement.reagent = element['Gemessene Komponente'];
        this.measurement.x_name = element['x_name'];
        this.measurement.x_unit = element['x_unit'];
        this.measurement.y_name = element['y_name'];
        this.measurement.y_unit = element['y_unit'];
      }
    };
  }

  public deleteFile(): void {
    this.file = undefined;
    this.measurementUploaded = false;
    this.measurementPlot = undefined;
  }

  public loadMeasurementImage(): void {
    this.dataService.plotMeasurement().subscribe(
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

}
