import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'src/app/core/services';
import { Card, Project, Stack } from '../shared/models';
import { CardsService, ProjectsService, StacksService } from '../shared/services';
import { MatFormFieldAppearance } from './../../shared/enums';

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

	matFormFieldAppearance = MatFormFieldAppearance;

	newStackForm: FormGroup;
	newCardForms: FormGroup;

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
			this.creatingStack = false;
			this.addNewCardForm();
			this.newStackForm.reset();
		}, err => {
			this.creatingStack = false;
		})
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
		this.cardsService.create(stack.id, newCard).subscribe(card => {
			stack.cards.push(card);
			this.creatingCard = false;
			this.resetForm(form);
		}, err => {
			this.creatingCard = false;
		});
	}

	private resetForm(form: FormGroup | AbstractControl): void {
		form.reset();
		form.markAsPristine();
		form.markAsUntouched();
	}

}
