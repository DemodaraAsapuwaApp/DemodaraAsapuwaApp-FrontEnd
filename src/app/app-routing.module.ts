import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EvaluationPanelComponent} from './main-panel/evaluation-panel/evaluation-panel.component';
import {SettingsPanelComponent} from './main-panel/settings-panel/settings-panel.component';
import {MembersPanelComponent} from './main-panel/members-panel/members-panel.component';

const routes: Routes = [
  { path: 'evaluation', component: EvaluationPanelComponent },
  { path: 'settings', component: SettingsPanelComponent },
  { path: 'members', component: MembersPanelComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
