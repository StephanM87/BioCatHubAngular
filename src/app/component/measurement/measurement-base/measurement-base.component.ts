import {Component, OnInit} from '@angular/core';
import {DataService} from 'src/app/service/data.service';
import {ExperimentService} from 'src/app/service/experiment.service';
import * as XLSX from 'xlsx';
import {Measurement} from '../../../model/measurement';
import {Replicate} from '../../../model/replicate';

@Component({
  selector: 'app-measurement-base',
  templateUrl: './measurement-base.component.html',
  styleUrls: ['./measurement-base.component.css']
})
export class MeasurementBaseComponent implements OnInit {

  public files: File[];
  public loading: boolean;
  public changeText: boolean;

  constructor(public dataService: DataService,
              public experimentService: ExperimentService) {
  }

  ngOnInit(): void {
    this.files = new Array<File>();
  }

  public getMeasurements(): Measurement[] {
    return this.dataService.getExperiment().getExperimentalData().measurements;
  }

  public onSelect(event: any): void {
    this.files.push(...event.addedFiles);
    this.uploadFiles();
  }

  public uploadFiles(): void {
    this.loading = true;
    this.files.forEach(file => {
      this.readMeasurementFromFile(file);
      this.loading = false;
    });
    this.files = new Array<File>();
  }

  public readMeasurementFromFile(file: File): void {
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (e: any) => {
      const measurement = new Measurement();
      // Workbook
      const binaryStr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binaryStr, {type: 'binary'});

      // WorkSheets
      const firstWorkSheet: XLSX.WorkSheet = wb.Sheets[wb.SheetNames[0]];
      const secondWorkSheet: XLSX.WorkSheet = wb.Sheets[wb.SheetNames[1]];

      // Replicates
      const replicatesData = XLSX.utils.sheet_to_json(firstWorkSheet);
      const replicates = new Array<Replicate>();
      replicatesData.forEach((element: any) => {
        const replicate = new Replicate();
        replicate.x_value = element.x_parameter;
        replicate.y_values.push(element.rep_1);
        replicate.y_values.push(element.rep_2);
        replicate.y_values.push(element.rep_3);
        replicates.push(replicate);
      });
      measurement.replicates = replicates;

      // Measurement
      const measurementData = XLSX.utils.sheet_to_json(secondWorkSheet);
      if (measurementData.length === 1) {
        const element: any = measurementData[0];
        measurement.reagent = element.reactant;
        measurement.x_name = element.x_name;
        measurement.x_unit = element.x_unit;
        measurement.y_name = element.y_name;
        measurement.y_unit = element.y_unit;
      }
      this.getMeasurements().push(measurement);
    };

  }

  public newMeasurement(): void {
    const measurement = new Measurement();
    const replica = new Replicate();
    replica.y_values = new Array<number>(3);
    measurement.replicates.push(replica);
    this.getMeasurements().push(measurement);
  }

  public templateFile(): void {
    this.loading = true;
    this.experimentService.templateFile().subscribe(
      blob => {
        this.download(blob, 'template.xlsx');
        this.loading = false;
      },
      error => {
        console.error(error);
        this.loading = false;
      }
    );
  }

  public download(blob: Blob, fileName: string): void {
    const a = document.createElement('a');
    const objectUrl = URL.createObjectURL(blob);
    a.href = objectUrl;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(objectUrl);
  }

}
