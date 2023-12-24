import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Report } from '../Report';
import { HashService } from '../hash.service';
import { LeafletService } from '../leaflet.service';
import { StorageService } from '../storage.service';
import { faLock, faUnlock, faAngleUp, faAngleLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
    faUnlock = faUnlock; faLock = faLock; faAngleUp = faAngleUp; faAngleLeft = faAngleLeft
    reports:Report[] = new Array()
    reportID:string = ''
    index:number = -1
    passOk:boolean = false; dialogueOn:boolean = false
    dialogueT:string = ""; dialogueMessage:string = ""
    @ViewChild('top') top!: ElementRef;
    constructor(private ActivatedRoute:ActivatedRoute, private storage:StorageService, private hash:HashService, private leaflet:LeafletService) {}

    ngOnInit(): void {
        this.storage.getObservable("reports").subscribe((data:any) => {
            this.reports = JSON.parse(data.data)
            const foundIndex = this.reports.findIndex(report => report.reportID === this.reportID)
            this.index = foundIndex !== -1 ? foundIndex : -1
            if(this.index !== -1) {
                this.leaflet.createMap('mapid', this.reports[this.index].coords, 12)
                this.leaflet.addMarker(this.reports[this.index].coords, `<b>${this.reports[this.index].location}</b>`, true)
            }
        })

        const paramreportID = this.ActivatedRoute.snapshot.paramMap.get('reportID')
        this.reportID = paramreportID || ''
    }

    openDialogue() {
        this.dialogueT = "Update Status"
        this.dialogueOn = true
    }

    closeDialogue() {
        this.dialogueOn = false
        this.passOk = false
    }

    changeStatus() {
        const pass = document.getElementById('pass') as HTMLInputElement | null
        if (pass) {
            const hashDigest = this.hash.MD5Observable(pass.value)
            hashDigest.subscribe((data:any) => {
                if (data.Digest === 'fcab0453879a2b2281bc5073e3f5fe54') {
                    this.updateReportStatus();
                } else {
                    this.dialogueT = "Access Denied"
                    this.dialogueMessage = "Incorrect password. Please double-check and try again."
                }
                this.passOk = true
            })
        } else {
            this.closeDialogue()
        }
    }

    scrollToTop() {
        this.top.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }

    private updateReportStatus() {
        if (this.index !== -1) {
            this.reports[this.index]._status = this.reports[this.index]._status === 'OPEN' ? 'RESOLVED' : 'OPEN'
            this.storage.updateDocument("reports", JSON.stringify(this.reports))
            this.dialogueT = "Operation Successful"
            this.dialogueMessage = "The status has been updated"
        }
    }
}