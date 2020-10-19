import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-base-layout',
	template: `
		<router-outlet></router-outlet>
  	`
})
export class BaseLayoutComponent implements OnInit {

	constructor() { }

	ngOnInit(): void {
	}

}
