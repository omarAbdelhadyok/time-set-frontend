import { EntityAudit } from 'src/app/shared/models/entity-audit.model';

export class Card extends EntityAudit {

	public constructor(init?: Partial<Card>) {
		super();
        Object.assign(this, init);
	}

	id: number;
	title: string;
	description: string;
	comments?: any;
	tasks?: any;
}