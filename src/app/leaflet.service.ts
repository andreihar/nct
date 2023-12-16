import { Injectable } from '@angular/core';
import * as L from 'leaflet';

@Injectable({
	providedIn: 'root'
})
export class LeafletService {
	map!:L.Map
	private iconDefault = L.icon({
		iconRetinaUrl: 'assets/marker-icon-2x.png',
		iconUrl: 'assets/marker-icon.png',
		shadowUrl: 'assets/marker-shadow.png',
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		popupAnchor: [1, -34],
		tooltipAnchor: [16, -28],
		shadowSize: [41, 41]
	});
	
	constructor() {}

	createMap(elementID:string, loglat:L.LatLngExpression=[49.27, -123], zoom:number=11) {
		this.map = L.map(elementID).setView(loglat, zoom)
		L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> ',
		}).addTo(this.map)
	}
	
	addMarker(coords:L.LatLng, text:string = "", open:boolean = false):void {
		const marker = this.createMarker(coords).addTo(this.map);
		if (text) {
			marker.bindPopup(text)
			if (open) {
				marker.bindPopup(text).openPopup()
			}
		}
	}

	createMarker(coords:L.LatLng):L.Marker {
		return L.marker(coords, { icon: this.iconDefault })
	}
}
