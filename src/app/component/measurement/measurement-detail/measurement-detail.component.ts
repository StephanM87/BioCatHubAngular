import {Component, Input, OnInit} from '@angular/core';
import {DataService} from 'src/app/service/data.service';
import {ExperimentService} from 'src/app/service/experiment.service';
import {MeasurementPlaceholder} from 'src/properties/placeholder';

import {PlotService} from 'src/app/service/plot.service';
import {Plot} from 'src/app/model/plot';
import {Measurement} from '../../../model/measurement';
import {Replicate} from '../../../model/replicate';

@Component({
  selector: 'app-measurement-detail',
  templateUrl: './measurement-detail.component.html',
  styleUrls: ['./measurement-detail.component.css', '../../../../assets/styles/form-styles.css']
})
export class MeasurementDetailComponent implements OnInit {

  @Input() measurement: Measurement;

  public measurementPlot: any;
  public placeholder = MeasurementPlaceholder;
  public reactants: string[];
  public plot: Plot;

  constructor(public dataService: DataService,
              public experimentService: ExperimentService,
              public plotService: PlotService) {
  }

  ngOnInit(): void {
    if (this.measurement.replicates.length > 0) {
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
        this.measurementPlot = this.createImageFromBlob(blob); // TODO this function doesnt return anything, html to show measurementPlot is commented out, plot is shown using plotly. Can this be deleted?
      },
      error => {
        this.showError(error);
      }
    );
  }

  createImageFromBlob(image: Blob): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.measurementPlot = reader.result;
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
  }

  public showError(error: any): void {
    console.error(error);
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
    if (this.getReplicaCount() > 1) {
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
    const replica = new Replicate();
    replica.y_values = new Array<number>(this.getReplicaCount());
    this.measurement.replicates.push(replica);
  }

  public deleteValues(): void {
    if (this.measurement.replicates.length > 1) {
      this.measurement.replicates.pop();
    } else {
      const replica = new Replicate();
      replica.y_values = new Array<number>(3);
      this.measurement.replicates = new Array<Replicate>();
      this.measurement.replicates.push(replica);
    }
  }

  getReplicaCount(): number {
    if (this.measurement.replicates.length > 0) {
      return this.measurement.replicates[0].y_values.length;
    }
    return 0;
  }

  public copyData(event: ClipboardEvent): void {
    const clipboardData = event.clipboardData;
    const pastedText = clipboardData.getData('text');
    const rows = pastedText.split('\n');
    rows.pop();
    const list = new Array<Replicate>();
    rows.forEach(row => {
      const cols = row.split('\t');
      const replica = new Replicate();
      replica.x_value = parseFloat(cols[0].replace(',', '.'));
      for (let i = 1; i < cols.length; i++) {
        replica.y_values.push(parseFloat(cols[i].replace(',', '.')));
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
