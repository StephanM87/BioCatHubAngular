import { Component, OnInit, Input } from '@angular/core';

import { Measurement } from 'src/app/model/biocatalysis';
import { PlotService } from '../plot.service';
import { Plot } from '../additional-experiment-model';

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.css']
})
export class PlotComponent implements OnInit {
  @Input() measurement: Measurement;
  
  plot: Plot;

  constructor(public plotService: PlotService, ) { }

  ngOnInit(): void {
    if(this.measurement.replicates.length > 0) {
      this.loadPlot();
    };
  }

  public updatePlot(): void {
    this.loadPlot();
  }

  loadPlot(): void {
    this.plot = this.plotService.loadPlot(this.measurement);
  }

}
