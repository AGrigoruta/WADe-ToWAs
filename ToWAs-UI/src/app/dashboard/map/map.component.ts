import { Component, OnInit, Input, Output, OnChanges, SimpleChanges } from '@angular/core';

import OlMap from 'ol/Map';
import OlXYZ from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';
import OlVectorSource from 'ol/source/Vector';
import OlVectorLayer from 'ol/layer/Vector';
import OlFeature from 'ol/Feature';
import OlPoint from 'ol/geom/Point';
import OlStyle from 'ol/style/Style';
import OlIcon from 'ol/style/Icon';

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
export class MapComponent implements OnInit, OnChanges {

  map: OlMap;
  source: OlXYZ;
  layer: OlTileLayer;
  view: OlView;
  marker: OlFeature;
  vectorSource: OlVectorSource;
  vectorLayer: OlVectorLayer;
  currentPosition: any;
  markerList: any;
  @Input() data: any;

  constructor(private user: UserService) { }

  async ngOnInit() {

    const getCurrentPosition = () => {
      return new Promise(async (res) => {
        let currentPosition: any = {}
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

    this.markerList = []

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

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.data) {
      return;
    } else {
      setTimeout(() => {
        this.map.removeLayer(this.vectorLayer);
        this.addMarkers();
      }, 1000)
    }
  }

  addMarkers() {
    this.data.forEach((item) => {
      const marker: OlFeature = new OlFeature({
        geometry: new OlPoint(fromLonLat([item.longitude, item.latitude])),
        name: item.name,
        picture: item.picture,
        address: item.address
      });
      this.markerList.push(marker)
    })

    const iconStyle = new OlStyle({
      image: new OlIcon(/** @type {olx.style.IconOptions} */({
        anchor: [0.5, 46],
        scale: 0.05,
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        opacity: 0.75,
        src: '../../../assets/images/icon.png'
      }))
    });

    this.vectorSource = new OlVectorSource({
      features: this.markerList
    });

    this.vectorLayer = new OlVectorLayer({
      source: this.vectorSource,
      style: iconStyle
    });

    // Simulate ajax call but with dummy data for now
    setTimeout(() => {
      this.map.addLayer(this.vectorLayer);
      this.centerMap(this.markerList[0].get('geometry').flatCoordinates[0], this.markerList[0].get('geometry').flatCoordinates[1]);
    }, 1000);

  }

  centerMap(lat, long) {
    this.map.setView(new OlView({
      center: ([lat, long]),
      zoom: 15
    }));
  }

}
