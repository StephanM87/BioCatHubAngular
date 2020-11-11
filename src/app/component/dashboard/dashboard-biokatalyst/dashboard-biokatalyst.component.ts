import { Component, OnInit, Input } from '@angular/core';
import { Enzyme } from 'src/app/model/biocatalysis';

@Component({
  selector: 'dashboard-biokatalyst',
  templateUrl: './dashboard-biokatalyst.component.html',
  styleUrls: ['./dashboard-biokatalyst.component.css']
})
export class DashboardBiokatalystComponent implements OnInit {
  @Input() enzymes: Enzyme[];
  public showEnzymeInformation: boolean;

  constructor() { }

  ngOnInit(): void {
    this.showEnzymeInformation = this.enzymes.length > 0;
  }

}
