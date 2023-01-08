import { Component, OnInit } from '@angular/core';
import { Experiment, IExperiment } from 'src/app/model/experiment';
import { DataService } from 'src/app/service/data.service';
import { ExperimentService } from 'src/app/service/experiment.service';
import { PlotService } from 'src/app/service/plot.service';
import { ActivatedRoute, Router } from '@angular/router'
import { Enzyme } from 'src/app/model/biocatalysis'
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

//import { type } from 'os';

@Component({
  selector: 'app-dashboard-base',
  templateUrl: './dashboard-base.component.html',
  styleUrls: ['./dashboard-base.component.css']
})
export class DashboardBaseComponent implements OnInit {

  public experiment: Experiment;
  public id: string;
  public zenodoLink: string;
  public creationDate: Date;
  public showAlert = true;
  public loading: boolean;
  public retrobiocatQuery: any

  constructor(public dataService: DataService, 
              public experimentService: ExperimentService,
              public router: ActivatedRoute,
              public routertype: Router) { 
    this.experiment = dataService.getExperiment();
    this.id = dataService.getId();
    this.zenodoLink = dataService.getZenodoLink();
    this.creationDate = dataService.getCreationDate();
    this.showAlert = false;
    //this.extractGETRequest()
  }

  ngOnInit(): void { // #TODO #31
    /*
      this.router.queryParams.subscribe(params => {
      
        if(params.name){
          console.log(params)
          this.extractGETRequest()
        }
      
      })
      */
  }

  public setEnzymes(enzymes): void {
    this.experiment.enzymes = enzymes
  }

// method to query retrobiocat response


/*

private extractGETRequest(){
  this.loading = true
  this.router.queryParams.subscribe(params => {
      if (params){
      console.log("params exist", params)
      this.loading=true
      this.experimentService.retrobiocatDBCall(params).subscribe(payload => {
        console.log(payload["status"])
        if(payload["status"]=="not found"){
          this.loading=false;
          this.routertype.navigate(["/dashboard"])
          window.alert("There was en error during the import")
        }
        else{
        if (payload["experimentalData"]){
          console.log("HURRRRRRRRRRRRAAA")
          console.log(payload)
          this.dataService.setExperiment(new Experiment(payload))
          this.dataService.setEnzymes(payload["enzymes"])
          //this.dataService.setExperimentalData(payload["experimentalData"])
          this.routertype.navigate(["/dashboard"])
  
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
        this.routertype.navigate(["/biokatalyst"])}}

    })}
  })
}

*/

  public uploadToZenodo(): void {
    this.loading = true;
    this.experimentService.uploadExperimentToZenodo(this.experiment).subscribe(
      upload => {
        this.id = upload.id;
        this.zenodoLink = upload.zenodoLink;
        this.showAlert = true;
        this.loading = false;
      },
      error => {
        this.showError(error);
        this.loading = false;
      }
    )
  }

  public exportEnzymeML(): void {
    this.loading = true;
    this.experimentService.createEnzymeML(this.experiment).subscribe(
      b => {


        let experimentName 

        
        console.log(b)

        let title = this.experiment.title
        let dateYear = this.creationDate.getFullYear()
        let dateMonth = this.creationDate.getMonth()
        let dateDay = this.creationDate.getUTCDay()
        let date = dateYear+"-"+dateMonth+"-"+dateDay
        let name = date+title

        if(b.type=="text/xml"){
          
          experimentName = name+"(noEnzymeML)"+".omex"
        }

        else if(b.type=="application/omex"){
          experimentName = name+".omex"
        }
        
        window.alert(experimentName)


        this.download(b, experimentName);
        this.loading = false;
      },
      error => {
        this.showError(error);
        window.alert(error["statusText"])
        this.loading = false;
      }
    );
  }

  public createPdf(): void {
    // TODO
  }

  public showError(error: any): void {
    console.log(error);
  }

  public download(blob: Blob, fileName: string): void {
    const a = document.createElement('a')
    const objectUrl = URL.createObjectURL(blob)
    a.href = objectUrl;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(objectUrl);
  }

}
