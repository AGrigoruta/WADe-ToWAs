import { Component, OnInit } from '@angular/core';

import OlMap from 'ol/Map';
import OlXYZ from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';

// Problem: The Definetly Typed project providing all of the types needed for the module pattern is outdated for OpenLayers
// Solution: Suppress import errors to bypass compilation (the 'missing' modules are there in fact, so they are false positive errors)
//@ts-ignore
import { fromLonLat } from 'ol/proj';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  map: OlMap;
  source: OlXYZ;
  layer: OlTileLayer;
  view: OlView;
  currentPosition: any;

  constructor(private user: UserService) { }

  async ngOnInit() {

    const getCurrentPosition = () => {
      return new Promise(async (res) => {
        let currentPosition:any = {}
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition((position) => {
            currentPosition.longitude = position.coords.longitude;
            currentPosition.latitude = position.coords.latitude;
            res(currentPosition);
          }, (err) => {
            console.log(err);
            currentPosition.longitude = 27.5816112;
            currentPosition.latitude = 47.1560762;
            res(currentPosition);
          });
        } else {
          console.log('Geolocation is not available in this browser');
          currentPosition.longitude = 27.5816112;
          currentPosition.latitude = 47.1560762;
          res(currentPosition);
        }
      })
    }

    let asyncPosition = await getCurrentPosition();
    this.currentPosition = asyncPosition;
    this.user.setPosition(this.currentPosition);

    this.source = new OlXYZ({
      url: 'http://tile.osm.org/{z}/{x}/{y}.png'
    });

    this.layer = new OlTileLayer({
      source: this.source
    });

    this.view = new OlView({
      center: fromLonLat([this.currentPosition.longitude, this.currentPosition.latitude]),
      zoom: 15
    });

    this.map = new OlMap({
      target: 'map',
      layers: [this.layer],
      view: this.view
    });
  }

}
