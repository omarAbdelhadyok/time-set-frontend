import { StatusNames } from 'src/app/shared/enums';
import { EntityAudit } from 'src/app/shared/models/entity-audit.model';
import { Stack } from './stack.model';

export class Project extends EntityAudit {
	
	public constructor(init?: Partial<Project>) {
		super();
        Object.assign(this, init);
	}

	id: number;
	title: string;
	description: string;
	status: StatusNames;
	img?: string;
	stacks?: Stack[];

}