import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Project } from 'src/app/projects/shared';

@Component({
	selector: 'app-card',
	templateUrl: './app-card.component.html',
	styleUrls: ['./app-card.component.scss']
})
export class AppCardComponent implements OnInit {

	@Input() project: Project;
	@Input() successBtnTitle: string;
	@Input() warnBtnTitle: string;
	@Input() dangerBtnTitle: string;
	@Input() width: string;

	@Output() onSuccessBtnClick = new EventEmitter();

	constructor() { }

	ngOnInit(): void {
	}

	onSuccessClick() {
		this.onSuccessBtnClick.emit(this.project.id);
	}

}
