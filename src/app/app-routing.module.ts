import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {EvaluationPanelComponent} from './evaluation-panel/evaluation-panel.component';
import {SettingsPanelComponent} from './settings-panel/settings-panel.component';

const routes: Routes = [
  { path: 'evaluation', component: EvaluationPanelComponent },
  { path: 'settings', component: SettingsPanelComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
