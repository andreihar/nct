import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

interface RouteConfig {
	changefreq: string;
	priority: number;
}

@Injectable({
	providedIn: 'root'
})
export class SitemapService {

	constructor(private router: Router) { }

	private routeConfig: { [key: string]: RouteConfig; } = {
		'': { changefreq: 'daily', priority: 1.0 },
		'create': { changefreq: 'monthly', priority: 0.1 },
		'report/:reportID': { changefreq: 'weekly', priority: 0.7 },
		'sitemap.xml': { changefreq: 'monthly', priority: 0.2 },
		'**': { changefreq: 'daily', priority: 0.7 }
	};

	generateSitemap(): string {
		const urls = this.router.config.map(route => {
			const path = route.path ? route.path : '';
			const config = this.routeConfig[path as keyof typeof this.routeConfig] || { changefreq: 'weekly', priority: 0.5 };
			return `
        <url>
          <loc>${window.location.origin}/${path}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>${config.changefreq}</changefreq>
          <priority>${config.priority}</priority>
        </url>`;
		});

		return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls.join('')}
    </urlset>`;
	}
}