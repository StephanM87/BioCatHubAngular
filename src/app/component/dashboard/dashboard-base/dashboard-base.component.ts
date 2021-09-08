import {Component} from '@angular/core';
import {Experiment} from 'src/app/model/experiment';
import {DataService} from 'src/app/service/data.service';
import {ExperimentService} from 'src/app/service/experiment.service';

@Component({
  selector: 'app-dashboard-base',
  templateUrl: './dashboard-base.component.html',
  styleUrls: ['./dashboard-base.component.css']
})
export class DashboardBaseComponent {

  public experiment: Experiment;
  public id: string;
  public zenodoLink: string;
  public creationDate: Date;
  public showAlert = false;
  public loading: boolean;

  constructor(public dataService: DataService, public experimentService: ExperimentService) {
    this.experiment = dataService.getExperiment();
    this.id = dataService.getId();
    this.zenodoLink = dataService.getZenodoLink();
    this.creationDate = dataService.getCreationDate();
  }

  // TODO not used - do we need this?
  public uploadToZenodo(): void {
    this.loading = true;
    this.experimentService.uploadExperimentToZenodo(this.experiment).subscribe(
      upload => {
        this.id = upload.id;
        this.zenodoLink = upload.zenodoLink;
        this.showAlert = true;
        this.loading = false;
      },
      error => {
        this.showError(error);
        this.loading = false;
      }
    );
  }

  public exportEnzymeML(): void {
    this.loading = true;
    this.experimentService.createEnzymeML(this.experiment).subscribe(
      b => {
        let experimentName;

        console.log(b); // TODO no such logs in a prod branch

        const title = this.experiment.title;
        const dateYear = this.creationDate.getFullYear();
        const dateMonth = this.creationDate.getMonth();
        const dateDay = this.creationDate.getUTCDay();
        const date = dateYear + '-' + dateMonth + '-' + dateDay;
        const name = date + title;

        if (b.type === 'text/xml') {
          experimentName = name + '(noEnzymeML)' + '.omex';
        } else if (b.type === 'application/omex') {
          experimentName = name + '.omex';
        }

        window.alert(experimentName);

        this.download(b, experimentName);
        this.loading = false;
      },
      error => {
        this.showError(error);
        window.alert(error.statusText);
        this.loading = false;
      }
    );
  }

  public createPdf(): void {
    // TODO
    // TODO better create a github issue instead of an empty method stub
  }

  public showError(error: any): void {
    console.error(error);
  }

  public download(blob: Blob, fileName: string): void {
    const a = document.createElement('a');
    const objectUrl = URL.createObjectURL(blob);
    a.href = objectUrl;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(objectUrl);
  }

}
