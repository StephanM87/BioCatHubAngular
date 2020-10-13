import { Component, OnInit } from '@angular/core';
import { Measurement, Replicate, Reagent } from 'src/app/model/biocatalysis';
import { DataService } from 'src/app/service/data.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-measurement',
  templateUrl: './measurement.component.html',
  styleUrls: ['./measurement.component.css']
})
export class MeasurementComponent implements OnInit {
  
  public files: File[];
  public measurementUploaded: boolean;
  public measurementPlot: any;

  constructor(public dataService: DataService) {
    this.files = new Array<File>();
    this.measurementUploaded = this.getMeasurement().replicates.length > 0;
    if(this.measurementUploaded) {
      this.loadMeasurementImage();
    }
  }

  ngOnInit(): void {
  }

  public getMeasurement(): Measurement {
    return this.dataService.getExperiment().getMeasurement();
  }

  public getReagents(): Reagent[] {
    return this.dataService.getExperiment().getReagents();
  }

	public onSelect(event: any) {
    this.files.push(...event.addedFiles);
    this.readMeasurementFromFile(this.files[0]);
	}

	public onRemove(event: any) {
		this.files.splice(this.files.indexOf(event), 1);
	}

  public uploadFile(): void {
    if(this.getMeasurement().replicates.length > 0){
      this.loadMeasurementImage();
      this.measurementUploaded = true;
    }
  }

  public readMeasurementFromFile(file: File): void {
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(file);
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
      this.getMeasurement().replicates = replicates;

      /* Measurement */
      const measurementData = XLSX.utils.sheet_to_json(secondWorkSheet);
      if(measurementData.length == 1){
        let element = measurementData[0];
        this.getMeasurement().reagent = element['Gemessene Komponente'];
        this.getMeasurement().x_name = element['x_name'];
        this.getMeasurement().x_unit = element['x_unit'];
        this.getMeasurement().y_name = element['y_name'];
        this.getMeasurement().y_unit = element['y_unit'];
      }
    };
    this.dataService.getFiles().push(file);
  }

  public deleteMeasurement(): void {
    this.files = new Array<File>();
    this.measurementUploaded = false;
    this.measurementPlot = undefined;
    this.dataService.getExperiment().setMeasurement(new Measurement());
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

  public updateImage(): void {
    this.loadMeasurementImage();
  }

  public templateFile(): void {
    
  }

}
