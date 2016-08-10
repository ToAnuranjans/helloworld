import {Page,Loading, NavController} from 'ionic-angular';
import { LocationFinderService } from '../../services/locationFinderService';
import {OnInit, PipeTransform} from 'angular2/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/share';
import { HomePage } from '../Home/Home';

@Page({
    templateUrl: 'build/pages/location/location.html',
    providers: [LocationFinderService]
})
export class Location implements OnInit {
    countries: any[] = [];
    states: any[] = [];
    cities: any[] = [];
    localities: any[] = [];
    skills: any[] = [];
    loading:any;


    selectedSkill: string;
    selectedCountry: string="India";
    selectedState: string;
    selectedCity: string;
    selectedLocation: string;

    constructor(private _locationFinderService: LocationFinderService, private _nav: NavController) {

    }
   
    loadCountries() {
        this.countries = ["India"];
         this.selectedCountry="India";
        this.loadStatesByCountryCode(this.selectedCountry);
        
    }
    selectCounty(selectedCountry) {
        this.states = [];
        this.cities = [];
        this.localities = [];
        this.selectedState="";
        selectedCountry="India";
        this.loadStatesByCountryCode(selectedCountry);

    }
    selectState(selectedState) {
        this.cities = [];
        this.localities = [];
        this.selectedCity="";
        this.selectedLocation="";
        this.selectedState=selectedState;
        this.loadCitiesByStateCode(selectedState);        
    }
    selectSkill(event) {
        this.selectedSkill = event;
    }
    selectCity(selectedCity) {
        this.localities = [];
        this.selectedLocation="";
        this.loadLocations(this.selectedState, selectedCity);
    }
    selectLocation(event) {
        this.selectedLocation = event;
    }
    loadStatesByCountryCode(country_code: string) {        
        this._locationFinderService.allstates()
            .subscribe(x => {
                this.states = x;               
            });
    }
    loadCitiesByStateCode(stateName: string) {
        this._locationFinderService.allcities(stateName)
            .subscribe(x => {
                this.cities = x;
            });
    }
    loadLocations(stateName: string, cityName: string) {
        this.localities = [];
        this._locationFinderService.alllocations(cityName)
            .subscribe(x => {
                this.localities = x;
            });
    }
    loadAllSkill() {
        this._locationFinderService.getAllSkills()
            .subscribe(x => {
                this.skills = x;
            });
    }


    NavigateToHome() {
        this._nav.push(HomePage, { "location_code": this.selectedLocation, "skill_code": this.selectedSkill });
    }

    ngOnInit() {
        this.loadCountries();
        this.loadAllSkill();
    }
}
