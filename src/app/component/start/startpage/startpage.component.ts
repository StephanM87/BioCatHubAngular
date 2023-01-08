import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Experiment } from 'src/app/model/experiment';
import { DataService } from 'src/app/service/data.service';
import { ExperimentService } from 'src/app/service/experiment.service';
import { Enzyme } from 'src/app/model/biocatalysis'

@Component({
  selector: 'app-startpage',
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.css']
})
export class StartpageComponent implements OnInit {

  public files: File[];
  public loading: boolean;
  public changeText: boolean;
  public showAlert = true;
  public retrobiocatQuery: any
  public experiment:Experiment

  constructor(private router: Router, 
    public dataService: DataService, 
    public experimentService: ExperimentService,
    public routertype: ActivatedRoute
    ) {
    this.files = new Array<File>();
    this.experiment = dataService.getExperiment();
  }

  ngOnInit(): void {
    
    this.routertype.queryParams.subscribe(params => {
    
      if(params.name){
        console.log(params)
        this.extractGETRequest()
      }
    
    })

}

  public newExperiment(): void {
    this.dataService.setExperiment(new Experiment());
    this.dataService.setId(undefined);
    this.dataService.setZenodoLink(undefined);
    this.dataService.setCreationDate(new Date());
    this.router.navigate(['./vessel']);
  }

  public onSelect(event: any) {
    this.files.push(...event.addedFiles);
    this.uploadFiles();
  }
  
  public uploadFiles(): void {
    this.loading = false;
    if(this.files && this.files.length > 0){
      let file = this.files[0];
      this.experimentService.readEnzymeML(file).subscribe(
        experiment => {

/*          console.log(experiment)
          this.files = new Array<any>();
        }, error => {
          console.log(error);
          this.loading = false;
        });
      this.files = new Array<File>();

*/
        this.dataService.setExperiment(new Experiment(experiment));
        console.log(experiment)
          this.dataService.setId(undefined);
          this.dataService.setZenodoLink(undefined);
          this.dataService.setCreationDate(new Date());
          this.router.navigate(['./dashboard']);
          this.loading = false;
        }, error => {
          console.log(error);
          this.loading = false;
        });
      this.files = new Array<File>();
      }
  }


  
private extractGETRequest(){
  this.loading = true
  this.routertype.queryParams.subscribe(params => {
      if (params){
      console.log("params exist", params)
      this.loading=true
      this.experimentService.retrobiocatDBCall(params).subscribe(payload => {
        console.log(payload["status"])
        if(payload["status"]=="not found"){
          this.loading=false;
          this.router.navigate(["/dashboard"])
          window.alert("There was en error during the import")
        }
        else{
        if (payload["experimentalData"]){
          console.log("HURRRRRRRRRRRRAAA")
          console.log(payload)
          this.dataService.setExperiment(new Experiment(payload))
          //this.dataService.setExperimentalData(payload["experimentalData"])
          this.router.navigate(["/dashboard"])
  
          this.loading=false;
        }
        else{
          console.log(payload)
        let title = payload.toString()
        this.dataService.setEnzymes(payload)
        this.experiment.title = title 
        let newExp = []
        for (let i in payload){
          let others = payload[i]
          others["others"] = []
          newExp.push(others)       
        }
        console.log(newExp)
        this.experiment.enzymes = newExp

        console.log("Zeige den payload", payload)
        console.log("die enzymes sind:", this.experiment.enzymes)
        //let snackBarRef =
        


        // set the enzyme object with the repose body

        //this.dataService.setEnzymes(payload)

        this.loading=false;
        this.router.navigate(["/biokatalyst"])}}

    })}
  })
}

} //}
//}