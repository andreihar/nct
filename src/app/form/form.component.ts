import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as uuid from 'uuid';

import { Location } from '../Location';
import { Report } from '../Report';
import { StorageService } from '../storage.service';
import { faAngleUp, faAngleLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
    faAngleUp = faAngleUp; faAngleLeft = faAngleLeft
    locations:Location[] = new Array()
    reports:Report[] = new Array()
    form:FormGroup
    newLoc:string = ""
    coords:L.LatLng | null = null
    newLocValid = false; locValid = false; existingLoc = true
    locationErr:string = "Please enter a non-empty name"; mapErr:string = "";
    @ViewChild('top') top!: ElementRef;

    constructor(private router:Router, private storage:StorageService) { 
        this.form = new FormGroup({
            reporterName: new FormControl('', [Validators.required, Validators.pattern(/\S/)]),
            phone: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
            name: new FormControl('', [Validators.required, Validators.pattern(/\S/)]),
            picture: new FormControl(),
            extra: new FormControl(),
            location: new FormControl(),
            newLocation: new FormControl(),
        });
    }

    ngOnInit(): void {
        this.storage.getObservable("locations").subscribe((data:any) => {
            this.locations = JSON.parse(data.data)
            this.existingLoc = this.locations.length > 0 ? true : false
        })
        this.storage.getObservable("reports").subscribe((data:any) => {
            this.reports = JSON.parse(data.data)
        })
    }

    verifyLocation(event:Event) {
        this.locValid = (event.target as HTMLSelectElement).selectedIndex !== 0
    }

    verifyNewLocation() {
        this.newLoc = this.form.controls['newLocation'].value
        this.newLocValid = this.newLoc.trim().length > 0 && !this.locations.some(el => el.name === this.newLoc.trim())
        if (!this.newLocValid)
            this.locationErr = this.newLoc.trim().length === 0 ? "Please enter a non-empty name" : `Name ${this.newLoc} is already used`
    }

    toggle(button:boolean) {
        if (button !== this.existingLoc) {
            this.existingLoc = !this.existingLoc
            this.coords = null
        }
    }

    updateCoords(update:L.LatLng) {
        this.coords = update
    }

    onSubmit() {
        if (this.form.valid && (this.existingLoc ? this.locValid : this.newLocValid && this.verifyPin())) {
            this.createReport()
            this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {this.router.navigate(["/"])})
        }
    }

    verifyPin(): boolean {
        this.mapErr = this.coords === null ? "Please click on the map to choose a location" :
            this.locations.find(el => el.coords === this.coords) ? "Location already exists. Please select another place" : "";
        return this.mapErr === "";
    }

    createReport():void {
        const location = this.existingLoc ? this.locations.find(el => (el.coords === this.form.controls['location'].value))! : this.createLocation()

        var report = new Report(
            uuid.v4(),
            this.form.controls['reporterName'].value,
            this.formatPhone(this.form.controls['phone'].value),
            this.form.controls['name'].value,
            location.name,
            location.coords,
            this.form.controls['picture'].value,
            this.form.controls['extra'].value?.trim() || 'none',
            new Date()
        )
        this.reports.push(report)
        this.storage.updateDocument("reports", JSON.stringify(this.reports))
        this.updateReportCount(location.name, true)
    }

    createLocation():Location {
        let location = new Location(this.coords!, this.newLoc.trim())
        this.locations.push(location)
        this.storage.updateDocument("locations", JSON.stringify(this.locations))
        this.newLoc = ""
        return location
    }

    updateReportCount(location:string, increase:boolean) {
        const foundLocation = this.locations.find(loc => loc.name === location)
        if (foundLocation) {
            foundLocation._cases += increase ? 1 : -1
            this.storage.updateDocument("locations", JSON.stringify(this.locations))
        }
    }

    scrollToTop() {
        this.top.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }

    formatPhone(phone:string):string {
        return `(${phone.slice(0,3)}) ${phone.slice(3,6)}-${phone.slice(6)}`
    }
}
