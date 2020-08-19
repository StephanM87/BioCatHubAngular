import { Component, OnInit } from '@angular/core';
import { Vessel } from 'src/app/model/biocatalysis';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { DataService } from 'src/app/service/data.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-measurement',
  templateUrl: './measurement.component.html',
  styleUrls: ['./measurement.component.css']
})
export class MeasurementComponent implements OnInit {

  public vessel: Vessel;
  public file: File;

  constructor(public dataService: DataService) {
    this.vessel = dataService.getExperiment().getVessel();
   }

  ngOnInit(): void {
  }

  public submit(): void {

  }

  public incomingFile(event: any): void {
    this.file = event.target.files[0];
  }

  public uploadFile(): void {
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(this.file);
    reader.onload = (e: any) => {
      /* create workbook */
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });

      /* selected the first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      const data = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
      console.log(data); // Data will be logged in array format containing objects
    };
  }

}
