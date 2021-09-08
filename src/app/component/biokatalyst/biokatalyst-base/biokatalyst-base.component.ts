import {Component} from '@angular/core';
import {Enzyme} from 'src/app/model/biocatalysis';
import {DataService} from 'src/app/service/data.service';

@Component({
  selector: 'app-biokatalyst',
  templateUrl: './biokatalyst-base.component.html',
  styleUrls: ['./biokatalyst-base.component.css']
})
export class BiokatalystBaseComponent {

  public selectedEnzyme: Enzyme; // TODO not used, can we delete this?

  constructor(public dataService: DataService) {
  }

  // Zentraler Zugriff auf die Enzyme über den Data-Service TODO comments in english
  public getEnzymes(): Enzyme[] {
    return this.dataService.getExperiment().getEnzymes();
  }

  public newEnzyme(): void {
    this.getEnzymes().push(new Enzyme());
  }

}
