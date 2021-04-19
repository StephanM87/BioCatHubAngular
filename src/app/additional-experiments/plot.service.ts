import { Injectable } from '@angular/core';

import { Measurement, Replicate } from 'src/app/model/biocatalysis';
import { Plot } from './additional-experiment-model';

@Injectable({
  providedIn: 'root'
})
export class PlotService {
  plot: Plot;

  constructor() {
    this.plot = {
      data: [],
      layout: {
        title: {
          text: ''
        },
        xaxis: {
          title: {
            text: ''
          }
        },
        yaxis: {
          title: {
            text: ''
          }
        }
      }
    }
  }

  /* Plot */
  public loadPlot(measurement: Measurement): Plot {
    this.updateDatapoints(measurement.replicates, measurement.plotStyle);
    this.updateMetadata(measurement);
    return this.plot;
  }

  updateDatapoints(replicates: Array<Replicate>, plotStyle: string): void {
    let n_datarows = replicates[0].y_values.length;
    let x_points = Array();
    let y_datarows = Array();
    /* Create n arrays for y data rows */
    for (let k = 0; k < n_datarows; k++) {
      let y_points = Array();
      y_datarows.push(y_points);
    };

    /*for loop over all replicates to create y data*/
    for (let i = 0; i < replicates.length; i++) {
      /*create x array by looping over all replicates and take first element x_value*/
      x_points.push(replicates[i].x_value);
      for (let j = 0; j < n_datarows; j++) {
        y_datarows[j].push(replicates[i].y_values[j]);
      };
    };

    /* empty plot.data and fill up with new data */
    this.plot.data.splice(0, this.plot.data.length);
    for (let l = 0; l < n_datarows; l++) {
      this.plot.data.push({ x: x_points, y: y_datarows[l], type: 'scatter', mode: plotStyle, name: 'replica ' + (l+1) });
    }
  }

  updateMetadata(measurement: Measurement): void {
    this.plot.layout.xaxis.title.text = measurement.x_name + '[' + measurement.x_unit + ']';
    this.plot.layout.yaxis.title.text = measurement.y_name + '[' + measurement.y_unit + ']';
  }

}
