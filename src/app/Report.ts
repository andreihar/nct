import * as L from 'leaflet';

const DEFAULT_STATUS:string = "OPEN";

export class Report {
    readonly reportID:string
    readonly reporterName:string
    readonly phone:string
    readonly name:string
    readonly location:string
    readonly coords:L.LatLng
    readonly picture:string
    readonly extra:string
    readonly dateTime:Date
    _status:string

    constructor(
        reportID:string,
        reporterName:string,
        phone:string,
        name:string,
        location:string,
        coords:L.LatLng,
        picture:string,
        extra:string,
        date:Date,
    ) {
        this.reportID = reportID
        this.reporterName = reporterName
        this.phone = phone
        this.name = name
        this.location = location
        this.coords = coords
        this.picture = picture
        this.extra = extra
        this.dateTime = date
        this._status = DEFAULT_STATUS
    }
}