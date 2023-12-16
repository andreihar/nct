import * as L from 'leaflet';

export class Location {
    readonly coords:L.LatLng
    readonly name:string
    _cases:number

    constructor(coords:L.LatLng, name:string) {
        this.coords = coords
        this.name = name
        this._cases = 0
    }
}