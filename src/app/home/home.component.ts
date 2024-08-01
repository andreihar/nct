import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { faListUl, faEarthAmericas } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    faEarthAmericas = faEarthAmericas; faListUl = faListUl;
    mapOn: boolean = true;

    constructor(private router: Router, private metaService: Meta) { }

    ngOnInit(): void {
        this.metaService.updateTag({ name: 'description', content: 'Night Crusade Titans is a superhero-themed app for reporting and managing public nuisances in the Lower Mainland.' });
        this.mapOn = this.router.url === '/map';
    }

    toggleView(isMapView: boolean) {
        this.mapOn = isMapView;
    }
}
