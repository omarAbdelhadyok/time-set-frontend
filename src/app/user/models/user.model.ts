export class User {

	public constructor(init?: Partial<User>) {
        Object.assign(this, init);
	}

	firstName?: string;
	lastName?: string;
	username: String;
	email: string;
	password: string;
	mobile: string;
}