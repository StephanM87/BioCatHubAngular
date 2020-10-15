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

  public showExperiment(): void {
    this.dataService.getExperimentFromZenodo(this.selectedExperiment.id).subscribe(
      json => {
        let experiment = new Experiment(json);
        experiment.id = this.selectedExperiment.id;
        experiment.zenodoLink = this.selectedExperiment.link;
        experiment.date = this.selectedExperiment.date;
        this.showDashboard(experiment);
      },
      error => {
        this.showError(error);
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
