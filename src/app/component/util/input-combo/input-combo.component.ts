import { Component, OnInit, Input } from '@angular/core';
import { Attribute } from 'src/app/model/biocatalysis';

@Component({
  selector: 'input-combo',
  templateUrl: './input-combo.component.html',
  styleUrls: ['./input-combo.component.css']
})
export class InputComboComponent implements OnInit {
  @Input() attributes: string[];
  @Input() attribute: Attribute;

  public dropDownOpen: boolean;
  public filteredAttributes: string[];

  constructor() { }

  ngOnInit(): void {
    this.filteredAttributes = this.attributes;
  }

  public filterAttributes(input: string): void {
    if(input.trim().length > 0) {
      this.filteredAttributes = this.attributes.filter(name => name.includes(input));
    }
    this.dropDownOpen = this.filteredAttributes.length > 0;
  }

  public showDropDownList(){
    this.filteredAttributes = this.attributes;
  }

  public selectAttribute(value: string) {
    this.attribute.key = value;
    this.dropDownOpen = false;
  }

}
