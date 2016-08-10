import { Injectable } from 'angular2/core';
import { Http, Headers, RequestOptions, Response } from 'angular2/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

@Injectable()
export class LocationFinderService {
     domain: string = "http://skillmanagement.azurewebsites.net/api/";
    
    constructor(private _http: Http) { }
  
    allstates() {
        var url = this.domain + "states";
        return this._http.get(url)
            .map((response: Response) => response.json());
    }

    allcities(stateName: string) {
        var url = this.domain + "states/" + stateName + "/districts";
        return this._http.get(url)
            .map(c => c.json());
    }
    alllocations(districtId: string) {
        var url = this.domain + "districts/" + districtId  + "/areas";
        return this._http.get(url)
            .map((response: Response) => response.json());
    }
    getAllSkills() {
        var url = this.domain + "skills";
        return this._http.get(url)
            .map(c => c.json());
    }
    getAllProfilesByLocationCode(location_code:string,skill_code:string) {
        var url =this.domain+"resources/"+ location_code + "/all";
        return this._http.get(url)
            .map(profile => profile.json());
    }
    submitData(userName:string,mobile:string,experienceSummary:string,locationCode:string)
    {
       console.log("Submitted",locationCode);
       let headers = new Headers({
			'Content-Type': 'application/x-www-form-urlencoded'
		});
	
        let options = new RequestOptions({
			headers: headers
		});
        var url=this.domain +"resources";
        var staticImageUrl = "http://www.gravatar.com/avatar?d=mm%26s=140";

        var body = 'name=' + userName + '&experienceSummary='
         + experienceSummary +'&mobile='+ mobile + 
         '&locationCode='+locationCode+'&imageUrl='+staticImageUrl ;       

        return this._http.post(url, body, options);    
	    // .toPromise()
		// 	.then(response => response.json()) 
        //     , this.handleError);        

    }
    handleError(error) {
		console.log(error);
		return error.json().message || 'Server error, please try again later';
	}
}