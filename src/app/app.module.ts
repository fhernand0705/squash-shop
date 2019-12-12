import { environment } from 'src/environments/environment';
import { AppComponent } from './app.component';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { SharedModule } from './shared/shared.module';
import { AdminModule } from './admin/admin.module';
import { ShoppingModule } from './shopping/shopping.module';
import { CoreModule } from './core/core.module';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AdminModule,
    SharedModule,
    ShoppingModule,
    CoreModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
