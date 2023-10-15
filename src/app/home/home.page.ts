import { Component } from '@angular/core';
import * as L from 'leaflet';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  map!: L.Map;

  constructor() { }
  // ngOnInit() {
  //   this.map = L.map('mapId').setView([110.3416410826356, -7.6860182143175155])
  //   //container map id

  //   L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  //   }).addTo(this.map);
  // }

  ionViewDidEnter() {

    //menambahkan basemap atau inisialisasi view peta
    this.map = L.map('mapId').setView([-7.6860182143175155, 110.3416410826356], 10)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    //membuat basemap grup dengan tile layer dari masing-masing basemap
    var basemapGroup = L.layerGroup([
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }),
      L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
        attribution: '<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a>'
      }),
      L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
      }),
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      }),
    ]);

    //menambahkan grup basemap ke dalam peta
    basemapGroup.addTo(this.map);

    //menambahkan kontrol peta berdasarkan grup basemap dari masing-masing layer (menggunakan array untuk mengambil basemap berdasarkan urutan)
    var basemapControl = L.control.layers({
      'Wikimedia': basemapGroup.getLayers()[1],
      'Topo-Vector': basemapGroup.getLayers()[2],
      'Black Carto DB': basemapGroup.getLayers()[3],
      'OpenStreetMap': basemapGroup.getLayers()[0],
    });


    //menambahkan basemap kontrol ke dalam map
    basemapControl.addTo(this.map);

    const markerIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png', // Ganti dengan URL ikon marker default dari CDN 
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png', // Ganti dengan URL ikon marker default 2x dari CDN 
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png', // Ganti dengan URL bayangan marker default dari CDN 
    iconSize: [25, 41], // Sesuaikan dengan ukuran ikon
    iconAnchor: [12, 41], // Sesuaikan dengan titik penunjuk ikon Anda
    });
    const marker = L.marker ([-7.78752056000459, 110.37327325619798], { icon: markerIcon }).addTo(this.map);
    marker.bindPopup("RSUD Sleman").openPopup();
  }

}
