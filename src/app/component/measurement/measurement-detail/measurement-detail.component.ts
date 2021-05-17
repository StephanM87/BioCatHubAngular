import { Component, OnInit, Input } from '@angular/core';
import { Measurement, Reactant, Replicate } from 'src/app/model/biocatalysis';
import { DataService } from 'src/app/service/data.service';
import { ExperimentService } from 'src/app/service/experiment.service';
import { MeasurementPlaceholder } from 'src/properties/placeholder';

import { PlotService } from 'src/app/service/plot.service';
import { Plot } from 'src/app/model/plot';

@Component({
  selector: 'measurement-detail',
  templateUrl: './measurement-detail.component.html',
  styleUrls: ['./measurement-detail.component.css', '../../../../assets/styles/form-styles.css']
})
export class MeasurementDetailComponent implements OnInit {
  @Input() measurement: Measurement;

  public measurementPlot: any;
  public placeholder = MeasurementPlaceholder;
  public reactants: string[];
  plot: Plot;

  constructor(public dataService: DataService, public experimentService: ExperimentService, 
              public plotService: PlotService,) { }

  ngOnInit(): void {
    if(this.measurement.replicates.length > 0) {
      this.loadMeasurementImage();
      this.updatePlot();
    }
    this.setReactantList();
  }

  public setReactantList(): void {
    this.reactants = new Array<string>();
    this.dataService.getExperiment().getEnzymes().forEach(enzyme => {
      enzyme.reaction.educts.forEach(reactant => {
        this.reactants.push(reactant.name);
      });
      enzyme.reaction.products.forEach(reactant => {
        this.reactants.push(reactant.name);
      });
    });
  }

  public deleteMeasurement(): void {
    this.dataService.deleteMeasurement(this.measurement);
  }

  public loadMeasurementImage(): void {
    this.experimentService.plotMeasurement(this.measurement).subscribe(
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
    this.updatePlot();
  }

  public updatePlot(): void {
    this.plot = this.plotService.loadPlot(this.measurement);
  }

  public addReplicate(): void {
    this.measurement.replicates.forEach(replica => {
      replica.y_values.push(undefined);
    });
  }

  public removeReplicate(): void {
    if(this.getReplicaCount() > 1){
      this.measurement.replicates.forEach(replica => {
        replica.y_values.pop();
      });
    } else {
      this.measurement.replicates.forEach(replica => {
        replica.y_values[0] = undefined;
      });
    }
  }

  public addValues(): void {
    let replica = new Replicate();
    replica.y_values = new Array<number>(this.getReplicaCount());
    this.measurement.replicates.push(replica);
  }

  public deleteValues(): void {
    if(this.measurement.replicates.length > 1) {
      this.measurement.replicates.pop();
    } else {
      let replica = new Replicate();
      replica.y_values = new Array<number>(3);
      this.measurement.replicates = new Array<Replicate>();
      this.measurement.replicates.push(replica);
    }
  }

  getReplicaCount(): number {
    if(this.measurement.replicates.length > 0) {
      return this.measurement.replicates[0].y_values.length;
    }
    return 0;
  }

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
    this.measurement.replicates = list;
    this.updateImage();
  }

  public getProgress(): string {
    return this.dataService.getMeasurementProgress(this.measurement).toFixed();
  }

}
