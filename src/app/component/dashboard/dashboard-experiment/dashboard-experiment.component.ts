import { Component, OnInit, Input } from '@angular/core';
import { Experiment } from 'src/app/model/experiment';

@Component({
  selector: 'dashboard-experiment',
  templateUrl: './dashboard-experiment.component.html',
  styleUrls: ['./dashboard-experiment.component.css', '../../../../assets/styles/form-styles.css']
})
export class DashboardExperimentComponent implements OnInit {
  @Input() experiment: Experiment;
  @Input() creationDate: Date;

  constructor() { }

  ngOnInit(): void {
  }

}
