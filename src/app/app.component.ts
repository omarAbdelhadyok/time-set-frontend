import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-root',
	template: `
		<router-outlet></router-outlet>
	`
})
export class AppComponent {

	constructor(public translate: TranslateService) {
		//initializing languages
		translate.addLangs(['en', 'ar']);

		// this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('en');
 
		// the lang to use, if the lang isn't available, it will use the current loader to get them
		translate.use('en');
	}
}
