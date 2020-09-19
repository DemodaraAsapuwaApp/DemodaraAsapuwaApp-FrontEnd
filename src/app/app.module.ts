import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { MainPanelComponent } from './main-panel/main-panel.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { EvaluationPanelComponent } from './main-panel/evaluation-panel/evaluation-panel.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatExpansionModule} from '@angular/material/expansion';
import { MemberListComponent } from './main-panel/evaluation-panel/member-list/member-list.component';
import { FileUploadComponent } from './main-panel/evaluation-panel/file-upload/file-upload.component';
import { SettingsPanelComponent } from './main-panel/settings-panel/settings-panel.component';
import {MatInputModule} from '@angular/material/input';
import {HttpClientModule} from '@angular/common/http';
import {MatTabsModule} from '@angular/material/tabs';
import { MemberSummaryComponent } from './main-panel/member-panel/member-summary/member-summary.component';
import { MemberComponent } from './main-panel/member-panel/add-modify-member/member.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {ConfirmDialogComponent} from './shared/confirm-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { TransactionMatchComponent } from './main-panel/evaluation-panel/transaction-match/transaction-match.component';
import {MatSelectModule} from '@angular/material/select';
import { DocGenerationComponent } from './main-panel/evaluation-panel/doc-generation/doc-generation.component';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {AddReasonDialogComponent} from './shared/add-reason-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPanelComponent,
    EvaluationPanelComponent,
    MemberListComponent,
    FileUploadComponent,
    SettingsPanelComponent,
    MemberSummaryComponent,
    MemberComponent,
    ConfirmDialogComponent,
    AddReasonDialogComponent,
    TransactionMatchComponent,
    DocGenerationComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatCheckboxModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    AppRoutingModule,
    MatStepperModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTableModule,
    MatSelectModule,
    MatMomentDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
