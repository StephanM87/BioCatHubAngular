import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'external-technologies',
  templateUrl: './technologies.component.html',
  styleUrls: ['./technologies.component.css']
})
export class TechnologiesComponent implements OnInit {

  public show: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
