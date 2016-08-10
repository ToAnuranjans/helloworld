import { Injectable } from 'angular2/core';
import { Http,HTTP_PROVIDERS } from 'angular2/http';
import 'rxjs/add/operator/map';


@Injectable() 
export class LaborService {
   private _profileServiceData:string ="/build/data/resources.location.json";
    constructor(private _http:Http){
        
    }    
    
    getAllProfilesByLocationCode(){
        return this._http.get(this._profileServiceData)
        .map(profile=>profile.json());
    }
  
    
}