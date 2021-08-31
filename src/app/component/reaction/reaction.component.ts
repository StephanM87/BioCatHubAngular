import { Component, OnInit } from '@angular/core';
import { ReactionPlaceholder } from 'src/properties/placeholder';
import { Attribute, Condition } from '../../model/biocatalysis';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-reaction',
  templateUrl: './reaction.component.html',
  styleUrls: ['./reaction.component.css', '../../../assets/styles/form-styles.css']
})
export class ReactionComponent implements OnInit {
  public attributes: string[] = ['attribute 1', 'attribute 2', 'attribute 3', 'attribute 4'];
  public placeholder = ReactionPlaceholder;
  reactionSystem: string
  aqueousIcon = '../../../assets/Icons/Aqueous icon.png'
  microAqueousIcon = '../../../assets/Icons/Micro-aqueous icon.png'
  public condition:Condition


  aqueousCSS = "Icon"
  microAqueousCSS = "Icon"


  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    this.condition = this.dataService.getExperiment().condition
    
  }
  
  

  clickAqueous(){
    this.reactionSystem = "aqueous"
    this.aqueousCSS = "IconWithBoder"
    this.microAqueousCSS = "Icon"
    this.condition.reactionSystem = "aqueous"
  }

  clickMicroAqueous(){
    this.reactionSystem="Micro-aqueous"
    this.aqueousCSS = "Icon"
    this.microAqueousCSS = "IconWithBoder"
    this.condition.reactionSystem = "micro-aqueous"

  }  

}
