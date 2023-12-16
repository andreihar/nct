import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faList, faMap } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    faMap = faMap; faList = faList
    mapOn:boolean = true
    
    constructor(private router:Router) {}

    ngOnInit(): void {
        this.mapOn = this.router.url === '/map'
    }

    toggleView(isMapView:boolean) {
        this.mapOn = isMapView
    }
}
