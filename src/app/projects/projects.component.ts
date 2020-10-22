import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-projects',
	template: `
		<div class="projects-container">
			<router-outlet></router-outlet>
		</div>
	`,
	styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

	constructor() { }

	ngOnInit(): void {
	}

}
