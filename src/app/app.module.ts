import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// Services
import { ContactAdminService } from '../../services/contact-admin.service';
import { ContactService } from '../../services/contact.service';
import { ContactDetailsService } from '../../services/contact-details.service';
import { ContactTypeAdminService } from '../../services/contact-type-admin.service';
import { ContactTypeService } from '../../services/contact-type.service';
import { DepartmentAdminService } from '../../services/department-admin.service';
import { DepartmentService } from '../../services/department.service';
import { StartUpService } from '../../services/start-up.service';
import { TagTypeService } from '../../services/tag-type.service';
import { TagTypeAdminService } from '../../services/tag-type-admin.service';
import { QueryObjectService } from '../../services/query-object.service';
// Components
import { ContactTypeDisplayComponent } from '../components/contact-type-display/contact-type-display';

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    ContactTypeDisplayComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ContactService,
    ContactAdminService,
    ContactDetailsService,
    ContactTypeService,
    ContactTypeAdminService,
    DepartmentAdminService,
    DepartmentService,
    StartUpService,
    TagTypeService,
    TagTypeAdminService,
    QueryObjectService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
