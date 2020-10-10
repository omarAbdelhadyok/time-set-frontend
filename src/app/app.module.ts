import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GeneralModule } from './general/general.module';
import { HomeModule } from './home/home.module';
import { CoreModule } from './core/core.module';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		GeneralModule,
		HomeModule,
		CoreModule,
		AppRoutingModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
