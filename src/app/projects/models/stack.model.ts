import { EntityAudit } from 'src/app/shared/models/entity-audit.model';
import { Card } from './card.model';

export class Stack extends EntityAudit {

	public constructor(init?: Partial<Stack>) {
		super();
        Object.assign(this, init);
	}

	id: number;
	title: string;
	cards?: Card[];
}