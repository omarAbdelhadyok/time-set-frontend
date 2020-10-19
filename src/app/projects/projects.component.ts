import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-projects',
	template: `
		<div class="container">
			<router-outlet></router-outlet>
		</div>
  	`,
})
export class ProjectsComponent implements OnInit {

	constructor() { }

	ngOnInit(): void {
	}

}
