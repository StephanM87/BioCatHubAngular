import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { Deposition } from '../../model/serviceresult';
import { Experiment} from '../../model/experiment';
import { Router } from '@angular/router';
import { ZenodoService } from 'src/app/service/zenodo.service';

@Component({
  selector: 'app-startpage',
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.css']
})
export class StartpageComponent implements OnInit {

  public loading: boolean;
  public files: File[];
  public experiments: Deposition[];
  public selectedExperiment: Deposition;

  constructor(private router: Router, public dataService: DataService, public zenodoService: ZenodoService) {
    this.files = new Array<File>();
    this.loading = true;
    this.zenodoService.getExperimentListFromZenodo().subscribe(
      experiments => {
        this.experiments = experiments;
        this.loading = false;
      },
      error => {
        console.log(error);
        this.loading = false;
      }
    );
  }

  ngOnInit(): void {
  }

  public import(): void {
    if(this.files.length > 0){
      // TODO: Omex Datei an Beackend senden -> Experiment laden
      this.files = new Array<File>();
    }
  }

  public newExperiment(): void {
    this.dataService.setExperiment(new Experiment());
    this.dataService.setId(undefined);
    this.dataService.setZenodoLink(undefined);
    this.dataService.setCreationDate(new Date());
    this.router.navigate(['./vessel']);
  }

  public showExperiment(): void {
    this.loading = true;
    this.zenodoService.getExperimentFromZenodo(this.selectedExperiment.id).subscribe(
      json => {
        let experiment = new Experiment(json);
        this.dataService.setId(this.selectedExperiment.id);
        this.dataService.setZenodoLink(this.selectedExperiment.link);
        this.dataService.setCreationDate(new Date(this.selectedExperiment.date));
        this.showDashboard(experiment);
        this.loading = false;
      },
      error => {
        this.showError(error);
        this.loading = false;
      }
    );
  }

  public showDashboard(experiment: Experiment): void {
    this.dataService.setExperiment(experiment);
    this.router.navigate(['./dashboard']);
  }

  public onSelect(event: any) {
    this.files.push(...event.addedFiles);
	}

	public onRemove(event: any) {
		this.files.splice(this.files.indexOf(event), 1);
  }

  public showError(error: any): void {
    console.log(error);
  }

}
