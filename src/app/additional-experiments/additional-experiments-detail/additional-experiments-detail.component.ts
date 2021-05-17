import { Component, OnInit, Input } from '@angular/core';
import * as XLSX from 'xlsx';

import { AdditionalExperimentService } from '../additional-experiment.service';
import { ClientService } from '../client.service';
import { DataService } from 'src/app/service/data.service';
import { ExperimentService } from 'src/app/service/experiment.service';
import { PlotService } from 'src/app/service/plot.service';

import { AdditionalExperiment } from '../additional-experiment-model';
import { Measurement, Replicate } from 'src/app/model/biocatalysis';
import { Experiment } from 'src/app/model/experiment';
import { Plot } from 'src/app/model/plot';
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
  @Input() additionalExperiment: AdditionalExperiment;

  public placeholder = AdditionalExperimentPlaceholder;
  public reactants: Array<string>;
  public parameters: Array<string>;
  public units: Array<string>;
  public initialExperiment: Experiment;
  public files: File[];
  public changeText: boolean;
  public hideMeasurement: boolean;
  public loading: boolean;
  plot: Plot;

  constructor(public additionalExperimentService: AdditionalExperimentService,
              public dataService: DataService,
              public experimentService: ExperimentService,
              public plotService: PlotService,
              public clientService: ClientService
              ) { }

  ngOnInit(): void {
    this.initialExperiment = this.dataService.getExperiment();
    this.setReactantList();
    this.setParameterList();
    this.setUnitList();
    this.files = new Array<File>();
    if (this.additionalExperiment.title == undefined) {
      this.additionalExperiment.title = this.initialExperiment.title;
    };
    if(this.additionalExperiment.measurement.replicates.length > 0) {
      this.updatePlot();
    };
    
  }

/* Set dropdown lists for reactants, parameters and units */
  public setReactantList(): void {
    this.reactants = this.additionalExperimentService.setReactantList(this.initialExperiment);
  }

  public setParameterList(): void {
    this.parameters = this.additionalExperimentService.setParameterList();
  }

  public setUnitList(): void {
    this.units = this.additionalExperimentService.setUnitList(this.additionalExperiment.parameter.name);
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
      this.additionalExperiment.measurement = measurement;
    };
  }

/* Functions for plotting */

  public updatePlot(): void {
    this.plot = this.plotService.loadPlot(this.additionalExperiment.measurement);
    this.updateTitle();
  }

/* Functions for Updating after inserting or changing data */

  public updateTitle(): void {
    this.additionalExperiment.title = this.initialExperiment.title + " (" + 
                                      this.additionalExperiment.parameter.name + " = " +
                                      this.additionalExperiment.parameter.value + " " +
                                      this.additionalExperiment.parameter.unit + ")";
  }

/* Functions to handle measurement data (replicates and values) */
  public addReplicate(): void {
    this.additionalExperimentService.addReplicate(this.additionalExperiment.measurement);
  }

  public removeReplicate(): void {
    this.additionalExperimentService.removeReplicate(this.additionalExperiment.measurement);
  }

  public addValues(): void {
    this.additionalExperimentService.addValues(this.additionalExperiment.measurement);
  }

  public deleteValues(): void {
    this.additionalExperimentService.deleteValues(this.additionalExperiment.measurement);
  }

  getReplicaCount(): number {
    if(this.additionalExperiment.measurement.replicates.length > 0) {
      return this.additionalExperiment.measurement.replicates[0].y_values.length;
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
    this.additionalExperiment.measurement.replicates = list;
    this.updatePlot();
  }

  /* Template file */
  public templateFile(): void {
    this.loading = true;
    this.clientService.templateFile().subscribe(
      blob => {
        this.download(blob, 'template.xlsx');
        this.loading = false;
      },
      error => {
        console.log(error);
        this.loading = false;
      }
    );
  }

  showError(error: any): void {
    console.log(error);
  }

  download(blob: Blob, fileName: string): void {
    const a = document.createElement('a')
    const objectUrl = URL.createObjectURL(blob)
    a.href = objectUrl;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(objectUrl);
  }

}
