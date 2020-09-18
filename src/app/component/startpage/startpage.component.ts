import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { Experiment} from '../../model/experiment';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-startpage',
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.css']
})
export class StartpageComponent implements OnInit {

  public files: File[];
  public zenodoId: string;

  public importVisible: boolean;
  public downloadVisible: boolean;

  constructor(private router: Router, private route: ActivatedRoute, public dataService: DataService) {
    this.files = new Array<File>();
  }

  ngOnInit(): void {
  }

  public import(): void {
    if(this.files.length > 0){
      // TODO: Omex Datei an Beackend senden -> Experiment laden
      this.files = new Array<File>();
      this.importVisible = false;
    }
  }

  public download(): void {
    this.downloadVisible = false;
    this.dataService.getExperimentFromZenodo(this.zenodoId).subscribe(
      experiment => {
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
