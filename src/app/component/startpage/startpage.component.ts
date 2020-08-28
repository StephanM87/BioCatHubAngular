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

  public file: File;
  public zenodoId: string;

  public importVisible: boolean;
  public downloadVisible: boolean;

  constructor(private router: Router, private route: ActivatedRoute, public dataService: DataService) { 
  }

  ngOnInit(): void {
  }

  public import(): void {
    
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

  public incomingFile(event: any): void {
    this.file = event.target.files[0];
  }

  public showError(error: any): void {
    console.log(error);
  }

}
