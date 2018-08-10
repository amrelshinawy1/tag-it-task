import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppComponent } from './app.component';
import { ApiService } from './services/apiService';
import { imageUploadService } from './services/imageUploadService';
import { itemService } from './services/itemService';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DataTablesModule,
    ModalModule,
    ModalModule.forRoot(),
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    MyDatePickerModule 
  ],
  providers: [ApiService, itemService, imageUploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
