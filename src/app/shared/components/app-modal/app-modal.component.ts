import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-modal',
	templateUrl: './app-modal.component.html',
	styleUrls: ['./app-modal.component.scss']
})
export class AppModalComponent implements OnInit {

	@Output() closeModal = new EventEmitter();

	constructor() { }

	ngOnInit(): void {
	}

	close() {
		console.log('clicked');
		this.closeModal.emit();
	}

}
