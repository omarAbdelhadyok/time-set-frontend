import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/core/services';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	
	constructor(public translate: TranslateService , private authService :AuthService) { }
	isLoggedIn;
	ngOnInit(): void {
		this.isLoggedIn = this.authService.isLoggedIn()
		console.log(this.isLoggedIn)
	}
	logOut(){
		this.authService.logout()
	}

}
