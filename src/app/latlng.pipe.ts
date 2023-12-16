import { Pipe, PipeTransform } from '@angular/core';
import * as L from 'leaflet';

@Pipe({
    name: 'latlng'
})
export class LatlngPipe implements PipeTransform {

    transform(coords:L.LatLng|null):string {
        if(!coords) return "(latitude, longitude)";
        return `(${coords.lat}, ${coords.lng})`;
    }
}
