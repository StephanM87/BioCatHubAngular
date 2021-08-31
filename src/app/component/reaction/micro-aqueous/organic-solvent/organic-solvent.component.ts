import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-organic-solvent',
  templateUrl: './organic-solvent.component.html',
  styleUrls: ['./organic-solvent.component.css']
})
export class OrganicSolventComponent implements OnInit {

  constructor() { }

  @Input() org

  


  ngOnInit(): void {
  }

}
