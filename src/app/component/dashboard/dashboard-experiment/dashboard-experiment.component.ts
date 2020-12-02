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

  public progressInformation: string;
  public progressUser: string;

  constructor() { }

  ngOnInit(): void {
    this.updateExperimentProgress();
    this.updateUserProgress();
  }

  updateExperimentProgress(): void {
    let count = 0;
    count += this.validate(this.experiment.title) ? 1 : 0;
    count += this.validate(this.experiment.description) ? 1 : 0;
    count += this.creationDate != undefined ? 1 : 0;
    let progress = (count/3)*100;
    this.progressInformation = progress.toFixed();
  }

  updateUserProgress(): void {
    let user = this.experiment.user;
    let count = 0;
    count += this.validate(user.firstName) ? 1 : 0;
    count += this.validate(user.lastName) ? 1 : 0;
    count += this.validate(user.email) ? 1 : 0;
    count += this.validate(user.institution) ? 1 : 0;
    let progress = (count/4)*100;
    this.progressUser = progress.toFixed();
  }

  private validate(value: string): boolean {
    return (value != undefined && value.trim().length > 0);
  }

}
