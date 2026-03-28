import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { TaskList } from './components/task-list/task-list';
import { TaskItem } from './components/task-item/task-item';
import { StatusFilterPipe } from './share/pipes/status-filter-pipe';
import { TaskFormComponent } from './components/task-form/task-form';
import { TaskStatusPipe } from './share/pipes/task-status-pipe';

@NgModule({
  declarations: [
    App,
    TaskList,
    TaskItem,
    StatusFilterPipe,
    TaskStatusPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    TaskFormComponent
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [App]
})
export class AppModule { }
