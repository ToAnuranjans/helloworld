import {OnInit} from 'angular2/core';
import {Page, NavParams} from 'ionic-angular';
import { LocationFinderService } from '../../services/locationFinderService';


@Page({
  templateUrl: 'build/pages/detail/detail.html',
  providers: [LocationFinderService]
})
export class Detail implements OnInit {
  profiles: any;
  resource: any;

  constructor(public navParams: NavParams, public _locationFinderService: LocationFinderService) {
    this.resource = this.navParams.get("selected_resource");
  }



  ngOnInit() {

  }
}

