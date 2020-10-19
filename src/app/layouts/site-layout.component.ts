import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-site-layout',
	template: `
		<app-header></app-header>
		<router-outlet></router-outlet>
	`
})
export class SiteLayoutComponent implements OnInit {

	constructor() { }

	ngOnInit(): void {
	}

}
