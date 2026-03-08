import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { TaskList } from './components/task-list/task-list';
import { TaskItem } from './components/task-item/task-item';
import { StatusFilterPipe } from './share/pipes/status-filter-pipe';
import { TaskFormComponent } from './components/task-form/task-form';

@NgModule({
  declarations: [
    App,
    TaskList,
    TaskItem,
    StatusFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    TaskFormComponent
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
