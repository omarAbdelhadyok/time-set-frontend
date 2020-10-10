export class SignInCredentials {
	
	public constructor(init?: Partial<SignInCredentials>) {
        Object.assign(this, init);
	}
	
	usernameOrEmail: string;
	password: string;
}