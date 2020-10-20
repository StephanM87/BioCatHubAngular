import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { Deposition } from '../../model/serviceresult';
import { Experiment} from '../../model/experiment';
import { Router, ActivatedRoute } from '@angular/router';

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

  constructor(private router: Router, private route: ActivatedRoute, public dataService: DataService) {
    this.files = new Array<File>();
    this.dataService.getExperimentListFromZenodo().subscribe(
      experiments => {
        this.experiments = experiments;
      },
      error => {
        console.log(error);
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
    this.router.navigate(['./../dashboard'], { relativeTo: this.route });
  }

  public showExperiment(): void {
    this.loading = true;
    this.dataService.getExperimentFromZenodo(this.selectedExperiment.id).subscribe(
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
    this.router.navigate(['./../dashboard'], { relativeTo: this.route });
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
