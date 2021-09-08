import {Component} from '@angular/core';
import {EnzymeSearch} from 'src/app/model/serviceresult';
import {DataService} from 'src/app/service/data.service';
import {EnzymeService} from 'src/app/service/enzyme.service';
import {BiokatalystPlaceholder} from 'src/properties/placeholder';
import {Enzyme} from '../../../model/enzyme';
import {Reaction} from '../../../model/reaction';

@Component({
  selector: 'app-enzyme-search',
  templateUrl: './enzyme-search.component.html',
  styleUrls: ['./enzyme-search.component.css']
})
export class EnzymeSearchComponent {

  public loading: boolean;
  public searchInput: string;
  public closeButton: boolean;
  public enzymeList: EnzymeSearch[];
  public dropdown: boolean;
  public placeholder = BiokatalystPlaceholder;

  constructor(public dataService: DataService, public enzymeService: EnzymeService) {
    this.enzymeList = new Array<EnzymeSearch>();
    this.loading = false;
  }

  public getEnzymes(): Enzyme[] {
    return this.dataService.getExperiment().getEnzymes();
  }

  public filterSearchInput(searchValue: string): void {
    if (searchValue.trim().length === 0) {
      this.resetSearch();
    } else {
      this.closeButton = true;
      this.dropdown = true;
      this.enzymeService.getEnzymeSearchList(searchValue).subscribe(
        data => {
          this.enzymeList = data;
        },
        error => {
          console.error(error);
        }
      );
    }
  }

  public resetSearch(): void {
    this.searchInput = '';
    this.closeButton = false;
    this.dropdown = false;
  }

  public selectSearchEnzyme(selected: EnzymeSearch): void {
    this.loading = true;
    this.enzymeService.getEnzymeSpecification(selected.ecNumber).subscribe(
      specification => {
        const enzyme = new Enzyme();
        enzyme.ecNumber = selected.ecNumber;
        enzyme.name = specification.enzymeName;
        enzyme.reaction = specification.reaction ? specification.reaction : new Reaction();
        this.getEnzymes().push(enzyme);
        this.resetSearch();
        this.loading = false;
      },
      error => {
        console.error(error);
        this.resetSearch();
        this.loading = false;
      }
    );
    this.enzymeService.addEnzymeReactions(selected.ecNumber);
  }

}
