import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Experiment } from 'src/app/model/experiment';
import { DataService } from 'src/app/service/data.service';
import { ExperimentService } from 'src/app/service/experiment.service';


@Component({
  selector: 'app-startpage',
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.css']
})
export class StartpageComponent implements OnInit {

  public files: File[];
  public loading: boolean;
  public changeText: boolean;

  constructor(private router: Router, public dataService: DataService, public experimentService: ExperimentService) {
    this.files = new Array<File>();
  }

  ngOnInit(): void {

  }

  public newExperiment(): void {
    this.dataService.setExperiment(new Experiment());
    this.dataService.setId(undefined);
    this.dataService.setZenodoLink(undefined);
    this.dataService.setCreationDate(new Date());
    this.router.navigate(['./vessel']);
  }

  public onSelect(event: any) {
    this.files.push(...event.addedFiles);
    this.uploadFiles();
  }
  
  public uploadFiles(): void {
    this.loading = false;
    if(this.files && this.files.length > 0){
      let file = this.files[0];
      this.experimentService.readEnzymeML(file).subscribe(
        experiment => {

/*          console.log(experiment)
          this.files = new Array<any>();
        }, error => {
          console.log(error);
          this.loading = false;
        });
      this.files = new Array<File>();

*/

        this.dataService.setExperiment(new Experiment(experiment));
        console.log(experiment)
          this.dataService.setId(undefined);
          this.dataService.setZenodoLink(undefined);
          this.dataService.setCreationDate(new Date());
          this.router.navigate(['./dashboard']);
          this.loading = false;
        }, error => {
          console.log(error);
          this.loading = false;
        });
      this.files = new Array<File>();
      }
  }

} //}
//}