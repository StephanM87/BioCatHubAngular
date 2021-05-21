import { Component, OnInit, Input } from '@angular/core';
import { Measurement } from 'src/app/model/biocatalysis';
import { PlotService } from 'src/app/service/plot.service';
import { Plot } from 'src/app/model/plot';

@Component({
  selector: 'dashboard-measurement-plot',
  templateUrl: './dashboard-measurement-plot.component.html',
  styleUrls: ['./dashboard-measurement-plot.component.css']
})
export class DashboardMeasurementPlotComponent implements OnInit {
  @Input() measurement: Measurement;

  plot: Plot;

  constructor(public plotService: PlotService) { }

  ngOnInit(): void {
    this.plot = this.plotService.loadPlot(this.measurement);
  }

}
