import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

import { Location } from '../Location';
import { LeafletService } from '../leaflet.service';
import { StorageService } from '../storage.service';
import { TitleService } from '../title.service';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit, OnInit {
    private locations: Location[] = new Array();

    constructor(private storage: StorageService, private leaflet: LeafletService, private titleService: TitleService, private metaService: Meta) { }

    ngOnInit(): void {
        this.titleService.setTitle('Map View');
        this.metaService.updateTag({ name: 'description', content: 'A map of all villains currently operating in the Lower Mainland that are to be defeated by the Night Crusade Titans.' });
        this.storage.getObservable('locations').subscribe((data: any) => {
            this.locations = data;
            this.createMarkers(this.locations.filter(location => location._cases > 0));
        });
    }

    ngAfterViewInit(): void {
        this.leaflet.createMap('mapid');
        this.createMarkers(this.locations);
    }

    private createMarkers(locations: Location[]) {
        locations.forEach(location => {
            this.leaflet.addMarker(location.coords, `<b>${location.name}</b><br>${location._cases} cases reported`);
        });
    }
}
