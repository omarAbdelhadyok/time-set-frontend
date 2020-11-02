import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'src/app/core/services';
import { CardModalComponent, DeleteConfirmComponent } from '../shared/components';
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
	creatingCard: boolean = false;

	editStackForms: FormGroup;
	newStackForm: FormGroup;
	newCardForms: FormGroup;

	constructor(private route: ActivatedRoute,
		private router: Router,
		private projectsService: ProjectsService,
		private stacksService: StacksService,
		private cardsService: CardsService,
		private notifier: NotifierService,
		private fb: FormBuilder,
		private dialog: MatDialog) { }

	ngOnInit(): void {
		//get project id from route parameters
		this.projectId = this.route.snapshot.params.id;
		//if no parameter navigate to dashboard
		if(!this.projectId) this.router.navigate(['/projects/dashboard']);
		this.getProjectById(this.projectId);
		this.createForms();
	}

	getProjectById(projectId: number): void {
		this.projectsService.get(projectId).subscribe(project => {
			this.project = project;
			//populate stack edit form array and card form array with forms for each stack
			project?.stacks.forEach(stack => {
				this.addNewCardForm();
				//a stack edit form will contain the value of it's stack's title
				this.addEditStackForm(stack.title);
			})
		}, (error: HttpErrorResponse) => {
			this.notifier.errorMessage(error.error.message);
		});
	}

	//create forms
	createForms() {
		this.createNewStackForm();
		this.initNewCardForm();
		this.initEditStackForm();
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

	//stack edit forms
	initEditStackForm(): void {
		this.editStackForms = this.fb.group({
			stackForms: this.fb.array([])
		});
	}

	createEditStackForm(stackTitle: string): FormGroup {
		return this.fb.group({
			title: [stackTitle, [Validators.required]]
		})
	}

	get stackForms(): FormArray {
		return this.editStackForms.get('stackForms') as FormArray;
	}

	addEditStackForm(stackTitle: string): void {
		this.stackForms.push(this.createEditStackForm(stackTitle));
	}

	//delete stack (confirm delete then delete or cancel)
	deleteStack(stack: Stack, index: number): void {
		const dialg = this.dialog.open(DeleteConfirmComponent, {
			data: `Are you sure you want to delete stack: ${stack.title}`,
			width: '40%'
		});

		dialg.afterClosed().subscribe((confirmed: boolean) => {
			//if user confirmed delete
			if(confirmed) {
				this.stacksService.delete(stack.id).subscribe(deleted => {
					if(deleted) this.project.stacks.splice(index, 1);
				});
			}
		})
	}

	//card modal
	openCardModal(card: Card, cardIndex: number): void {
		//get card by id first, then open modal
		this.cardsService.get(card.id).subscribe(resCard => {
			const dialg = this.dialog.open(CardModalComponent, {
				data: resCard,
				width: '60%',
				maxHeight: '80vh'
			});
		})
	}


	//update stack
	updateStack(stack: Stack, formIndex: number) {
		//get form from the form array
		let form = this.stackForms.controls[formIndex];
		//if the title (only feild in the form) has not changed return
		if(stack.title.trim() === form.value.title.trim()) return;
		if(form.invalid) {
			this.notifier.errorMessage('errors.fillForm');
			//if form is invalid set the title back (in case it was deleted)
			form.get('title').setValue(stack.title);
			return;
		}
		let newStack = new Stack(stack);
		Object.assign(newStack, form.value);
		//disable form
		form.disable();
		this.stacksService.update(newStack).subscribe(updatedStack => {
			stack.title = updatedStack.title;
			form.enable();
		}, (error: HttpErrorResponse) => {
			this.notifier.errorMessage(error.error.message);
			form.enable();
		});
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
			form.reset();
		}, err => {
			this.creatingCard = false;
		});
	}

}
