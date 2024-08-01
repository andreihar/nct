import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { ReportComponent } from './report/report.component';
import { SitemapComponent } from './sitemap/sitemap.component';

const routes: Routes = [
    {
        path: '', component: HomeComponent, children: [
            { path: '', redirectTo: 'map', pathMatch: 'full' },
            { path: 'map', component: MapComponent },
            { path: 'list', component: ListComponent }
        ]
    },
    { path: 'create', component: FormComponent },
    { path: 'report/:reportID', component: ReportComponent },
    { path: 'sitemap.xml', component: SitemapComponent },
    { path: '**', component: HomeComponent }
];

@NgModule({
    imports: [CommonModule, RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
