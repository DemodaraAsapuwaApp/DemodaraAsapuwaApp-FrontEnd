import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EvaluationPanelComponent} from './main-panel/evaluation-panel/evaluation-panel.component';
import {SettingsPanelComponent} from './main-panel/settings-panel/settings-panel.component';
import {MemberSummaryComponent} from './main-panel/member-panel/member-summary/member-summary.component';
import {MemberComponent} from './main-panel/member-panel/add-modify-member/member.component';
import {MembershipConformationComponent} from './main-panel/reports-panel/membership-conformation/membership-conformation.component';

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
  {
    path: 'reports',
    children: [
      {path: 'membership-confirmation/:id', component: MembershipConformationComponent},
      {path: 'membership-confirmation', component: MembershipConformationComponent}
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
