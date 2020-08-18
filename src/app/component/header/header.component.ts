import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { User } from '../../model/user'
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public user: User;
  public userDataVisible: boolean;

  constructor(public dataService: DataService) {
    this.user = dataService.getUser();
    this.userDataVisible = false;
  }

  ngOnInit(): void {}

  public getUserName(): string {
    return this.user.getDisplayName();
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
