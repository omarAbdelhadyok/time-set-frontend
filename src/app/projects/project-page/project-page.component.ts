import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'src/app/core/services';
import { HomeComponent } from 'src/app/home/components';
import { Card, Project, Stack } from '../shared/models';
import { CardsService, ProjectsService, StacksService } from '../shared/services';

@Component({
	selector: 'app-project-page',
	templateUrl: './project-page.component.html',
	styleUrls: ['./project-page.component.scss']
})
export class ProjectPageComponent implements OnInit {

	projectId: number;
	project: Project;
	creatingStack: boolean = false;
	editingStack: boolean = false;
	creatingCard: boolean = false;

	isStackModalOpened: boolean = false;

	newStackForm: FormGroup;
	newCardForms: FormGroup;
	editStackForm: FormGroup;

	constructor(private route: ActivatedRoute,
		private projectsService: ProjectsService,
		private stacksService: StacksService,
		private cardsService: CardsService,
		private notifier: NotifierService,
		private fb: FormBuilder) { }

	ngOnInit(): void {
		this.projectId = this.route.snapshot.params.id;
		this.getProjectById(this.projectId);
		this.createForms();
	}

	getProjectById(projectId: number): void {
		this.projectsService.get(projectId).subscribe(project => {
			this.project = project;
			for(let i = 0; i < project?.stacks.length; i++) {
				this.addNewCardForm();
			}
		});
	}

	//create forms
	createForms() {
		this.createNewStackForm();
		this.initNewCardForm();
		this.createEditStackForm();
	}

	//new stack form
	createNewStackForm(): void {
		this.newStackForm = this.fb.group({
			title: ['', [Validators.required]]
		});
	}

	//new card form
	initNewCardForm(): void {
		this.newCardForms = this.fb.group({
			cardForms: this.fb.array([])
		});
	}

	createNewCardForm(): FormGroup {
		return this.fb.group({
			title: ['', [Validators.required]]
		})
	}

	get cardForms(): FormArray {
		return this.newCardForms.get('cardForms') as FormArray;
	}

	addNewCardForm(): void {
		this.cardForms.push(this.createNewCardForm());
	}

	//edit stack form
	createEditStackForm(): void {
		this.editStackForm = this.fb.group({
			title: ['', [Validators.required]]
		});
	}

	//stack modal
	openEditStackModal(stack: Stack) {
		
	}

	//create stack
	createStack() {
		if(this.newStackForm.invalid) {
			this.notifier.errorMessage('errors.fillForm');
			return;
		}
		let stack = new Stack(this.newStackForm.value);
		this.creatingStack = true;
		this.stacksService.create(this.project.id, stack).subscribe(stack => {
			this.project.stacks.push(stack);
			this.addNewCardForm();
			this.creatingStack = false;
		}, err => {
			this.creatingStack = false;
		})
	}

	editStack() {
		if(this.editStackForm.invalid) {
			this.notifier.errorMessage('errors.fillForm');
			return;
		}
		let stack = new Stack(this.editStackForm.value);
		console.log(stack);
		this.editingStack = true;
		this.stacksService.update(this.project.id, stack.id, stack).subscribe(console.log);
		this.isStackModalOpened = false;
	}

	//create card
	createCard(formIndex: number): void {
		let form = this.cardForms.controls[formIndex];
		if(form.invalid) {
			this.notifier.errorMessage('errors.fillForm');
			return;
		}
		let stack = this.project.stacks[formIndex];
		let newCard = new Card(form.value);
		this.creatingCard = true;
		this.cardsService.create(this.project.id, stack.id, newCard).subscribe(card => {
			stack.cards.push(card);
			this.creatingCard = false;
			form.reset();
		}, err => {
			this.creatingCard = false;
		});
	}

}
