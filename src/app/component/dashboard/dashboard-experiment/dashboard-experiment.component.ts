import {Component, Input} from '@angular/core';
import {Experiment} from 'src/app/model/experiment';
import {ExperimentPlaceholder} from 'src/properties/placeholder';

@Component({
  selector: 'app-dashboard-experiment',
  templateUrl: './dashboard-experiment.component.html',
  styleUrls: ['./dashboard-experiment.component.css', '../../../../assets/styles/form-styles.css']
})
export class DashboardExperimentComponent {
  @Input() experiment: Experiment;
  @Input() creationDate: Date;

  public placeholder = ExperimentPlaceholder;

  public getProgressInformation(): string {
    let count = 0;
    count += this.validate(this.experiment.title) ? 1 : 0;
    count += this.validate(this.experiment.description) ? 1 : 0;
    count += this.creationDate !== undefined ? 1 : 0;
    const progress = (count / 3) * 100;
    return progress.toFixed();
  }

  public getProgressUser(): string {
    const user = this.experiment.user;
    let count = 0;
    count += this.validate(user.firstName) ? 1 : 0;
    count += this.validate(user.lastName) ? 1 : 0;
    count += this.validate(user.email) ? 1 : 0;
    count += this.validate(user.institution) ? 1 : 0;
    const progress = (count / 4) * 100;
    return progress.toFixed();
  }

  private validate(value: string): boolean {
    return (value !== undefined && value.trim().length > 0);
  }

}
