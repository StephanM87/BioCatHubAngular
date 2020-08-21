import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-startpage',
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.css']
})
export class StartpageComponent implements OnInit {

  public file: File;

  public importVisible: boolean;
  public downloadVisible: boolean;

  constructor() { 
  }

  ngOnInit(): void {
  }

  public import(): void {
    this.importVisible = false;
  }

  public download(): void {
    this.downloadVisible = false;
  }

  public incomingFile(event: any): void {
    this.file = event.target.files[0];
  }

}
