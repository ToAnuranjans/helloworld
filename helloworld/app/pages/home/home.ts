import {Page,NavController,NavParams,Alert} from 'ionic-angular';
import { LocationFinderService } from '../../services/locationFinderService';
import {OnInit} from 'angular2/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/share';
import { Detail } from '../detail/detail';



@Page({
  templateUrl: 'build/pages/home/home.html',
  providers: [LocationFinderService]
})
export class HomePage implements OnInit {
  location_code: string;
  skill_code: string;
  profiles: any;
  resources: any;
  selectedResource: any;
  anyResourceAvailable : boolean;
  userName:string;
  password:string;


  constructor( private locationFinderService: LocationFinderService,private navParams: NavParams, private _nav: NavController) {
    this.location_code = this.navParams.get("location_code");
    this.skill_code = this.navParams.get("skill_code");
  }

  loadProfilesByLocationCode(location_code: string, skill_code: string) {
    this.locationFinderService.getAllProfilesByLocationCode(location_code, skill_code).subscribe(x => {
      this.resources = x;
      this.anyResourceAvailable = x.length>0;
    });
  }

  displayDetails(event, resource) {
    this.selectedResource=resource;
    this._nav.push(Detail, { "selected_resource": this.selectedResource });
  }

  ngOnInit() {
    this.loadProfilesByLocationCode(this.location_code,this.skill_code);
  }

  addUser()
  {
      let alert = Alert.create({
    title: 'Add Facilitator Details',
    inputs: [
      {
        name: 'name',
        placeholder: 'Full Name',
        checked:true
      },      
      {
        name: 'mobile',
        placeholder: '10 digit Mobile number',
        type:'tel',
        checked:true
      },
      {
        name: 'experienceSummary',
        placeholder: 'Enter facility descriptions',
        type:'textarea',
        checked:true
      
      }
    ],
   
     buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Submit',
        handler: data =>
         {        
           console.log("Cicked", data);  
             this.locationFinderService.submitData(data.name, data.mobile,data.experienceSummary,this.location_code)
            .subscribe(newResource=>{
               this.resources.push(newResource.json());
              console.log("New Resource", this.resources); 
               
            });
             
          }
      }
    ]
  });
  this._nav.present(alert);
  }
}

