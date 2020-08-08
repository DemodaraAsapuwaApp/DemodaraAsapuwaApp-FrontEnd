import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EvaluationPanelComponent} from './main-panel/evaluation-panel/evaluation-panel.component';
import {SettingsPanelComponent} from './main-panel/settings-panel/settings-panel.component';
import {MemberSummaryComponent} from './main-panel/member-summary/member-summary.component';
import {MemberComponent} from './member/member.component';

const routes: Routes = [
  {path: '', redirectTo: 'evaluation', pathMatch: 'full'},
  {
    path: 'evaluation',
    children: [
      {path: '', redirectTo: 'end-evaluation', pathMatch: 'full'},
      {path: 'end-evaluation', component: EvaluationPanelComponent},
      {path: 'mid-evaluation', component: EvaluationPanelComponent}
    ]
  },
  {
    path: 'members',
    children: [
      {path: 'summary', component: MemberSummaryComponent},
      {path: 'add', component: MemberComponent},
      {path: 'modify/:id', component: MemberComponent}
    ]
  },
  {path: 'settings', component: SettingsPanelComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
