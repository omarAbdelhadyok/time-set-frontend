import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifierService } from 'src/app/core/services';
import { StatusNames } from 'src/app/shared/enums';
import { Card, Task } from '../../models';
import { TasksService } from '../../services';

@Component({
	selector: 'app-card-modal',
	templateUrl: './card-modal.component.html',
	styleUrls: ['./card-modal.component.scss']
})
export class CardModalComponent implements OnInit, AfterViewInit {

	newTaskForm: FormGroup;
	busyCreatingTask: boolean = false;
	busyDeletingTask: boolean = true;
	busyUpdatingStatus: boolean = false;
	completedPrecent: number;

	//fixes the issue of the mat accourdion when it glitches on dialog open
	disableAnimation: boolean = true;

	constructor(public dialogRef: MatDialogRef<CardModalComponent>,
		@Inject(MAT_DIALOG_DATA) public card: Card,
		private notifier: NotifierService,
		private tasksService: TasksService,
		private fb: FormBuilder) { }

	ngOnInit(): void {
		console.log(this.card);
		this.calcCompletedPrecent();
		this.createNewTaskForm();
	}

	ngAfterViewInit(): void {
		// timeout required to avoid the dreaded 'ExpressionChangedAfterItHasBeenCheckedError'
		setTimeout(() => this.disableAnimation = false);
	}

	calcCompletedPrecent() {
		let allTasks = this.card.tasks.length;
		let completedTasks = 0;
		this.card.tasks.forEach(task => {
			if (task.status === "CLOSED") completedTasks += 1;
		});
		this.completedPrecent = (completedTasks / allTasks) * 100;
		console.log(completedTasks, allTasks);
	}

	displayDate(date: string): string {
		if (!date) return;
		return new Date(date).toLocaleString();
	}

	createNewTaskForm(): void {
		this.newTaskForm = this.fb.group({
			task: ['', [Validators.required]],
			dueDate: ['']
		});
	}

	closeTask(task: Task, i: number): void {
		let updatedTask = new Task(task);
		updatedTask.status = StatusNames.CLOSED;
		this.busyUpdatingStatus = true;
		this.tasksService.updateStatus(updatedTask).subscribe(closedTask => {
			this.card.tasks[i] = closedTask;
			this.busyUpdatingStatus = false;
			this.calcCompletedPrecent();
		})
	}

	deleteTask(taskId: number, taskIndex: number) {
		this.busyDeletingTask = true;
		this.tasksService.delete(taskId).subscribe(deleted => {
			this.card.tasks.splice(taskIndex, 1);
			this.busyDeletingTask = false;
			this.calcCompletedPrecent();
		})
	}

	createTask(): void {
		if (this.newTaskForm.invalid) {
			this.notifier.errorMessage('errors.fillForm');
			return;
		}
		let task = new Task(this.newTaskForm.value);
		this.busyCreatingTask = true;
		this.tasksService.create(this.card.id, task).subscribe(createdTask => {
			this.card.tasks.push(createdTask);
			this.busyCreatingTask = false;
			this.newTaskForm.reset();
			this.calcCompletedPrecent();
		}, err => {
			this.busyCreatingTask = false;
		})
	}

}
