import { Component, OnInit } from '@angular/core';
import { EnzymeService } from 'src/app/service/enzyme.service';
import { Enzyme, Reaction, Reactant, Attribute } from '../../model/biocatalysis';
import { EnzymeSearch } from '../../model/serviceresult';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-enzyme',
  templateUrl: './enzyme.component.html',
  styleUrls: ['./enzyme.component.css']
})
export class EnzymeComponent implements OnInit {

  // Filterung
  public loading: boolean;
  public searchInput: string;
  public closeButton: boolean;
  public enzymeList: EnzymeSearch[];
  public dropdown: boolean;

  constructor(public dataService: DataService, public enzymeService: EnzymeService) {
    this.enzymeList = new Array<EnzymeSearch>();
    this.loading = false;
  }

  ngOnInit(): void {}

  // Zentraler Zugriff auf die Enzyme über den Data-Service
  public getEnzymes(): Enzyme[] {
    return this.dataService.getExperiment().getEnzymes();
  }

  public newEnzyme(): void {
    this.getEnzymes().push(new Enzyme());
  }
  
  public deleteEnzyme(enzyme: Enzyme) {
    this.dataService.getExperiment().deleteEnzyme(enzyme);
  }

  // Methoden für die Enzyme Suche
  public filterSearchInput(searchValue: string): void {
    if(searchValue.trim().length == 0){
      this.resetSearch();
    } else {
      this.closeButton = true;
      this.dropdown = true;
      this.enzymeService.getEnzymeSearchList(searchValue).subscribe(
        data => {
          this.enzymeList = data;
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  public resetSearch(): void {
    this.searchInput = "";
    this.closeButton = false;
    this.dropdown = false;
  }

  public selectSearchEnzyme(selected: EnzymeSearch): void {
    this.loading = true;
    this.resetSearch();
    let enzyme = new Enzyme();
    enzyme.ecNumber = selected.ecNumber;
    enzyme.brendaLink = selected.brendaLink;
    this.enzymeService.getEnzymeSpecification(selected.ecNumber).subscribe(
      specification => {
        enzyme.name = specification.enzymeName;
        enzyme.reaction = specification.reaction ? specification.reaction : new Reaction();
        this.getEnzymes().push(enzyme);
        this.loading = false;
      },
      error => {
        console.log(error);
        this.loading = false;
      }
      );
    this.enzymeService.addEnzymeReactions(selected.ecNumber);
  }

  // Attribute
  public addAttribute(enzyme: Enzyme): void {
    enzyme.others.push(new Attribute());
  }

  public deleteAttribute(enzyme: Enzyme, other: Attribute): void {
    let index = enzyme.others.indexOf(other);
    if (index !== -1) {
      enzyme.others.splice(index, 1);
    }
  }

}
