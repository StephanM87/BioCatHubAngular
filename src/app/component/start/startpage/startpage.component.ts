import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Experiment } from 'src/app/model/experiment';
import { Deposition } from 'src/app/model/serviceresult';
import { DataService } from 'src/app/service/data.service';
import { ZenodoService } from 'src/app/service/zenodo.service';

@Component({
  selector: 'app-startpage',
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.css']
})
export class StartpageComponent implements OnInit {

  public files: File[];

  constructor(private router: Router, public dataService: DataService) {
    this.files = new Array<File>();
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

  public onSelect(event: any) {
    this.files.push(...event.addedFiles);
	}

	public onRemove(event: any) {
		this.files.splice(this.files.indexOf(event), 1);
  }

}
