import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { User } from '../../model/user'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public user: User;
  public userDataVisible: boolean;

  constructor() {
    this.userDataVisible = false;
    this.user = {
      firstName: 'Max',
      lastName: 'Mustermann',
      email: 'max@mustermann.de',
      institution: 'FZ Jülich',
      orcid: '4711'
    };
  }

  ngOnInit(): void {
  }

  public saveUserData(): void {
    this.hideUserData();
  }

  public showUserData(): void {
    this.userDataVisible = true;
  }

  hideUserData(): void {
    this.userDataVisible = false;
  }

}
