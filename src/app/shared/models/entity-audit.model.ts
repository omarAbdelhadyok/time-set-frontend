import { EntityDate } from './entity-date.model';

export class EntityAudit extends EntityDate {
	createdBy: number;
	updatedBy: number;
}
