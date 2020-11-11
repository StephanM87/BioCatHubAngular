import { Component, OnInit } from '@angular/core';
import { Enzyme } from 'src/app/model/biocatalysis';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-biokatalyst',
  templateUrl: './biokatalyst-base.component.html',
  styleUrls: ['./biokatalyst-base.component.css']
})
export class BiokatalystBaseComponent implements OnInit {

  public selectedEnzyme: Enzyme;

  constructor(public dataService: DataService) {}

  ngOnInit(): void {}

  // Zentraler Zugriff auf die Enzyme über den Data-Service
  public getEnzymes(): Enzyme[] {
    return this.dataService.getExperiment().getEnzymes();
  }

  public newEnzyme(): void {
    this.getEnzymes().push(new Enzyme());
  }

}
