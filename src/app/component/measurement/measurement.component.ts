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
  public measurementTable: boolean;

  constructor(public dataService: DataService) {
    this.measurementTable = dataService.getExperiment().getMeasurement().values != undefined;
   }

  ngOnInit(): void {
  }

  public getVessel(): Vessel {
    return this.dataService.getExperiment().getVessel();
  }

  public getMeasurement(): Measurement {
    return this.dataService.getExperiment().getMeasurement();
  }

  public submit(): void {

  }

  public incomingFile(event: any): void {
    this.file = event.target.files[0];
  }

  public uploadFile(): void {
    if(this.file != undefined){
      let measurement = new Measurement();

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
          let replicas = new Array<number>(element['repl_1'], element['repl_2'], element['repl_3']);
          let value = new Replicate(element['x_value'], replicas);
          replicates.push(value);
        });
        measurement.values = replicates;

        /* Measurement */
        const measurementData = XLSX.utils.sheet_to_json(secondWorkSheet);
        if(measurementData.length == 1){
          let element = measurementData[0];
          measurement.replica = element['replica'];
          measurement.reagent = element['reagent'];
          measurement.type = element['type'];
          measurement.data_unit = element['data_unit'];
          measurement.time_unit = element['time_unit'];
        }
      };

      this.dataService.getExperiment().setMeasurement(measurement);
      this.measurementTable = true;
    }
  }

  public deleteFile(): void {
    this.file = undefined;
    this.measurementTable = false;
    this.dataService.getExperiment().setMeasurement(new Measurement());
  }

}
