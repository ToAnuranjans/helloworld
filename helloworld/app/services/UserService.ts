import { Injectable } from 'angular2/core';
import { Http, HTTP_PROVIDERS } from 'angular2/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
    
    constructor() { }

    submitData(userName:string,password:string,experienceSummary:string)
    {
            return true;
    }

}

