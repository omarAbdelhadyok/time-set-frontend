import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'form-submit-btn',
	templateUrl: './form-submit-btn.component.html',
	styleUrls: ['./form-submit-btn.component.scss']
})
export class FormSubmitBtnComponent implements OnInit {

	@Input() btnLable: string;
	@Input() formInvalid: boolean;
	@Input() isLoading: boolean;

	constructor() { }

	ngOnInit(): void {
	}

}
