import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-project-page',
	templateUrl: './project-page.component.html',
	styleUrls: ['./project-page.component.scss']
})
export class ProjectPageComponent implements OnInit {

	constructor(private route: ActivatedRoute) { }

	ngOnInit(): void {
		console.log(this.route.snapshot.params.id);
	}

}
