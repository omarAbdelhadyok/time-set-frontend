import { StatusNames } from 'src/app/shared/enums';
import { EntityAudit } from 'src/app/shared/models';

export class Task extends EntityAudit {

	public constructor(init?: Partial<Task>) {
		super();
        Object.assign(this, init);
	}

	id: number;
	task: string;
	dueDate: string;
	status: StatusNames | string;
}