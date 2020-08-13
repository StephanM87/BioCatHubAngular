import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-biocathub',
  templateUrl: './biocathub.component.html',
  styleUrls: ['./biocathub.component.css']
})
export class BiocathubComponent implements OnInit {

  public collapsed: boolean;

  constructor() {
    this.collapsed = true;
   }

  ngOnInit(): void {
  }

}
