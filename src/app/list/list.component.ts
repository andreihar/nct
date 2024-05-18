import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Location } from '../Location';
import { Report } from '../Report';
import { HashService } from '../hash.service';
import { StorageService } from '../storage.service';

import { faCalendarDays, faEye, faLocationDot, faTrashCan, faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
    faTrashCan = faTrashCan; faEye = faEye; faLocationDot = faLocationDot; faCalendarDays = faCalendarDays; faLock = faLock; faUnlock = faUnlock
    locations:Location[] = []
    reports:Report[] = []

    dialogueOn:boolean = false
    passOk:boolean = false
    deleteID:string = ''
    dialogueT:string = ""; dialogueMessage:string = ""
    password:string = ''

    constructor(private router:Router, private storage:StorageService, private hash:HashService) {}
    
    ngOnInit(): void {
        this.storage.getObservable('reports').subscribe((data:any) => {this.reports = data})
        this.storage.getObservable('locations').subscribe((data:any) => {this.locations = data})
    }

    viewReport(reportID:string) {
        this.router.navigate(['report', reportID]);
    }
    
    openDialogue(reportID:string) {
        this.dialogueT = "Delete report";
        this.dialogueOn = true;
        this.deleteID = reportID;
    }
    
    deleteReport() {
        let hashDigest = this.hash.MD5Observable(this.password)
        hashDigest.subscribe((data:any) => {
            if (data.Digest === 'fcab0453879a2b2281bc5073e3f5fe54') {
                const index = this.reports.findIndex(report => report.reportID === this.deleteID)
                if (index !== -1) {
                    const location = this.reports[index].location
                    this.reports.splice(index, 1)
                    this.storage.updateDocument("reports", JSON.stringify(this.reports))
                    this.updateReportCount(location, false)
                    this.dialogueT = "Deletion Successful"
                    this.dialogueMessage = "Report has been successfully deleted."
                }
            } else {
                this.dialogueT = "Password error"
                this.dialogueMessage = "Incorrect password. Please double-check and try again."
            }
            this.passOk = true
            this.deleteID = ''
        })
        this.password = ''
    }
    
    closeDialogue() {
        this.dialogueOn = false
        this.passOk = false
        this.deleteID = ''
        this.password = ''
    }

    updateReportCount(location:string, increase:boolean) {
        const foundLocation = this.locations.find(loc => loc.name === location)
        if (foundLocation) {
            increase ? foundLocation._cases++ : foundLocation._cases--
            this.storage.updateDocument("locations", JSON.stringify(this.locations))
        }
    }

    sort(event:Event) {
        const attr = (event.target as HTMLSelectElement).value
        const sortFunctions: { [key: string]: (r1: Report, r2: Report) => number } = {
            'location': (r1:Report, r2:Report) => r1.location.localeCompare(r2.location),
            'name': (r1:Report, r2:Report) => r1.name.localeCompare(r2.name),
            'time': (r1:Report, r2:Report) => new Date(r1.dateTime).getTime() - new Date(r2.dateTime).getTime()
        }
        this.reports.sort(sortFunctions[attr] || (() => 0));
    }
}
