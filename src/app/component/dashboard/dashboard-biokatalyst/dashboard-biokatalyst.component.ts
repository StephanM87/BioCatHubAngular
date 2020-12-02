import { Component, OnInit, Input } from '@angular/core';
import { Enzyme } from 'src/app/model/biocatalysis';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'dashboard-biokatalyst',
  templateUrl: './dashboard-biokatalyst.component.html',
  styleUrls: ['./dashboard-biokatalyst.component.css']
})
export class DashboardBiokatalystComponent implements OnInit {
  @Input() enzymes: Enzyme[];

  public showEnzymeInformation: boolean;
  public progress: string;

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    this.showEnzymeInformation = this.enzymes.length > 0;
    this.setProgress();
  }

  setProgress() {
    let count = 0;
    let total = 0;
    if(this.enzymes != undefined) {
      this.enzymes.forEach(enzyme => {
        count += this.dataService.getEnzymeProgress(enzyme);
        total += 100;
      });
    }
    let progressValue = total > 0 ? (count/total)*100 : 0;
    this.progress = progressValue.toFixed();
  }

}
