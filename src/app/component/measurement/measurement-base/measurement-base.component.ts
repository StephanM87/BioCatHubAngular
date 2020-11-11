import { Component, OnInit } from '@angular/core';
import { Measurement, Replicate } from 'src/app/model/biocatalysis';
import { DataService } from 'src/app/service/data.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-measurement-base',
  templateUrl: './measurement-base.component.html',
  styleUrls: ['./measurement-base.component.css']
})
export class MeasurementBaseComponent implements OnInit {

  public files: File[];
  public loading: boolean;

  constructor(public dataService: DataService) {

  }

  ngOnInit(): void {
    this.files = new Array<File>();
  }

  public getMeasurements(): Measurement[] {
    return this.dataService.getExperiment().getMeasurements();
  }

	public onSelect(event: any) {
    this.files.push(...event.addedFiles);
    this.uploadFiles();
	}

	public onRemove(event: any) {
		this.files.splice(this.files.indexOf(event), 1);
	}

  public uploadFiles(): void {
    this.loading = true;
    this.files.forEach(file => {
      this.readMeasurementFromFile(file);
    });
    this.files = new Array<File>();
    this.loading = false;
  }

  public readMeasurementFromFile(file: File): void {
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (e: any) => {
      let measurement = new Measurement();
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
      measurement.replicates = replicates;

      /* Measurement */
      const measurementData = XLSX.utils.sheet_to_json(secondWorkSheet);
      if(measurementData.length == 1){
        let element = measurementData[0];
        measurement.reagent = element['Gemessene Komponente'];
        measurement.x_name = element['x_name'];
        measurement.x_unit = element['x_unit'];
        measurement.y_name = element['y_name'];
        measurement.y_unit = element['y_unit'];
      }
      this.getMeasurements().push(measurement);
    };

  }

  public newMeasurement(): void {
    this.getMeasurements().push(new Measurement());
  }

  public templateFile(): void {
    
  }

}
