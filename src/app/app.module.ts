import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BiocathubComponent } from './biocathub/biocathub.component';
import { HeaderComponent } from './component/header/header.component';
import { NavigationComponent } from './component/navigation/navigation.component';
import { StartpageComponent } from './component/startpage/startpage.component';
import { UserdataComponent } from './component/userdata/userdata.component';

@NgModule({
  declarations: [
    AppComponent,
    BiocathubComponent,
    HeaderComponent,
    NavigationComponent,
    StartpageComponent,
    UserdataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
