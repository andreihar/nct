import { Component, OnInit } from '@angular/core';
import { SitemapService } from './sitemap.service';

@Component({
	selector: 'app-sitemap',
	template: '',
})
export class SitemapComponent implements OnInit {

	constructor(private sitemapService: SitemapService) { }

	ngOnInit(): void {
		const sitemap = this.sitemapService.generateSitemap();
		const blob = new Blob([sitemap], { type: 'application/xml' });
		const url = window.URL.createObjectURL(blob);
		window.location.href = url;
	}
}