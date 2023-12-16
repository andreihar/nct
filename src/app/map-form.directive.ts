import { Directive, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { LeafletService } from './leaflet.service';

@Directive({
    selector: '[appMapForm]'
})
export class MapFormDirective implements OnInit {
    @Output() coords: EventEmitter<L.LatLng> = new EventEmitter();
    constructor(private elm:ElementRef, private leaflet:LeafletService) { }
    
    ngOnInit(): void {
        this.leaflet.createMap(this.elm.nativeElement)
        var marker: L.Marker | null = null
        this.leaflet.map.on('click', (event:L.LeafletMouseEvent) => {
            if(marker !== null)
                this.leaflet.map.removeLayer(marker)
            marker = this.leaflet.createMarker(event.latlng)
            marker.addTo(this.leaflet.map)
            this.coords.emit(event.latlng)
        })
    }
}
