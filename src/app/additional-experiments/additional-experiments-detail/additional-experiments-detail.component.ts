import { Component, OnInit, Input } from '@angular/core';
import * as XLSX from 'xlsx';

import { AdditionalExperimentService } from '../additional-experiment.service';
import { DataService } from '../../service/data.service';
import { ExperimentService } from '../../service/experiment.service';
import { PlotService } from '../plot.service';
import { AdditionalExperiment } from '../additional-experiment-model';
import { Measurement, Replicate } from 'src/app/model/biocatalysis';
import { Experiment } from 'src/app/model/experiment';
import { AdditionalExperimentPlaceholder } from 'src/properties/placeholder';

@Component({
  selector: 'app-additional-experiments-detail',
  templateUrl: './additional-experiments-detail.component.html',
  styleUrls: [
    './additional-experiments-detail.component.css',
    '../../../assets/styles/form-styles.css'
  ]
})
export class AdditionalExperimentsDetailComponent implements OnInit {
  @Input() additionalexperiment: AdditionalExperiment;

  public measurementPlot: any;
  public placeholder = AdditionalExperimentPlaceholder;
  public reactants: string[];
  public parameters: string[];
  public units: string[];
  public initialExperiment: Experiment;
  public files: File[];
  public changeText: boolean;
  public hideMeasurement: boolean;
  public loading: boolean;

  constructor(public additionalExperimentService: AdditionalExperimentService,
              public dataService: DataService,
              public experimentService: ExperimentService,
              public plotService: PlotService
              ) { }

  ngOnInit(): void {
    if(this.additionalexperiment.measurement.replicates.length > 0) {
      this.loadMeasurementImage();
    }
    this.initialExperiment = this.dataService.getExperiment();
    this.setReactantList();
    this.setParameterList();
    this.files = new Array<File>();
  }

/* Set dropdown lists for reactants, parameters and units */
  public setReactantList(): void {
    this.reactants = this.additionalExperimentService.setReactantList(this.initialExperiment);
  }

  public setParameterList(): void {
    this.parameters = this.additionalExperimentService.setParameterList();
  }

  public setUnitList(): void {
    this.units = this.additionalExperimentService.setUnitList(this.additionalexperiment.changedparameter);
  }

/* Upload Measurements */
  public onSelect(event: any) {
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
        measurement.reagent = element['reactant'];
        measurement.x_name = element['x_name'];
        measurement.x_unit = element['x_unit'];
        measurement.y_name = element['y_name'];
        measurement.y_unit = element['y_unit'];
      }
      this.additionalexperiment.measurement = measurement;
    };
  }

/* Functions for Measurement image */
  
  public updateImage(): void {
    this.plotService.loadPlot(this.additionalexperiment.measurement);
  }

  public aupdateImage(): void {
    this.loadMeasurementImage();
  }

  public loadMeasurementImage(): void {
    this.experimentService.plotMeasurement(this.additionalexperiment.measurement).subscribe(
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

/* Functions to handle measurement data (replicates and values) */
  public addReplicate(): void {
    this.additionalExperimentService.addReplicate(this.additionalexperiment.measurement);
  }

  public removeReplicate(): void {
    this.additionalExperimentService.removeReplicate(this.additionalexperiment.measurement);
  }

  public addValues(): void {
    this.additionalExperimentService.addValues(this.additionalexperiment.measurement);
  }

  public deleteValues(): void {
    this.additionalExperimentService.deleteValues(this.additionalexperiment.measurement);
  }

  getReplicaCount(): number {
    if(this.additionalexperiment.measurement.replicates.length > 0) {
      return this.additionalexperiment.measurement.replicates[0].y_values.length;
    }
    return 0;
  }

/*  */
  public copyData(event: ClipboardEvent) {
    let clipboardData = event.clipboardData;
    let pastedText = clipboardData.getData('text');
    let rows = pastedText.split('\n');
    rows.pop();
    let list = new Array<Replicate>();
    rows.forEach(row => {
      let cols = row.split('\t');
      let replica = new Replicate();
      replica.x_value = parseFloat(cols[0].replace(',','.'));
      for (let i = 1; i < cols.length; i++) {
        replica.y_values.push(parseFloat(cols[i].replace(',','.')));
      }
      list.push(replica);
    });
    this.additionalexperiment.measurement.replicates = list;
    this.updateImage();
  }

  public deleteAdditionalExperiment(): void {
    this.additionalExperimentService.deleteAdditionalExperiment(this.additionalexperiment);
  }
  
}
