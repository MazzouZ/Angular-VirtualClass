import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
/*
import { MapsComponent } from './maps/maps.component';
*/
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UserListComponent } from './user-list/user-list.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {HttpClientModule} from '@angular/common/http';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTreeModule} from '@angular/material/tree';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatInputModule} from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatMenuModule} from '@angular/material/menu';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSortModule} from '@angular/material/sort';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {A11yModule} from '@angular/cdk/a11y';
import {PortalModule} from '@angular/cdk/portal';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {MatChipsModule} from '@angular/material/chips';
import {ErrorStateMatcher, MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatSliderModule} from '@angular/material/slider';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import { UserAddComponent } from './user-list/user-add/user-add.component';
import { UserModifyComponent } from './user-list/user-modify/user-modify.component';
import { EditDialogOrganisationComponent } from './organisations/edit-dialog-organisation/edit-dialog-organisation.component';
import { AddDialogOrganisationComponent } from './organisations/add-dialog-organisation/add-dialog-organisation.component';
import { OrganisationsComponent } from './organisations/organisations.component';
import { CoursComponent } from './Cours/cours/cours.component';
import { AddDialogeCoursComponent } from './Cours/add-dialog-cours/add-dialoge-cours/add-dialoge-cours.component';
import { EditDialogeCoursComponent } from './Cours/edit-dialog-cours/edit-dialoge-cours/edit-dialoge-cours.component';
import { PostComponent } from './Post/post/post.component';
import { AddDialogPostComponent } from './Post/add-dialog-post/add-dialog-post/add-dialog-post.component';
import { EditDialogPostComponent } from './Post/edit-dialog-post/edit-dialog-post/edit-dialog-post.component';
import { OnClickDialogPostComponent } from './Post/onClick-dialog-post/on-click-dialog-post/on-click-dialog-post.component';
import { LoginComponent } from './login/login.component';
import {AuthService} from './services/auth.service';
import {CrudService} from './services/crud.service';
import { MaterialFileUploadComponent } from './material-file-upload/material-file-upload.component';




@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ComponentsModule,
        RouterModule,
        AppRoutingModule,
        MatDatepickerModule,
        MatPaginatorModule,
        MatTableModule,
        MatFormFieldModule,
        A11yModule,
        ClipboardModule,
        CdkStepperModule,
        CdkTableModule,
        CdkTreeModule,
        DragDropModule,
        MatAutocompleteModule,
        MatBadgeModule,
        MatBottomSheetModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatStepperModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatTreeModule,
        PortalModule,
        ScrollingModule,
        MatInputModule,
        /* AgmCoreModule.forRoot({
           apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
         }),*/
    ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    UserListComponent,
    UserAddComponent,
    UserModifyComponent,
    OrganisationsComponent,
    EditDialogOrganisationComponent,
    AddDialogOrganisationComponent,
    CoursComponent,
    AddDialogeCoursComponent,
    EditDialogeCoursComponent,
    PostComponent,
    AddDialogPostComponent,
    EditDialogPostComponent,
    OnClickDialogPostComponent,
    LoginComponent,
    MaterialFileUploadComponent

  ],
  providers: [AuthService,CrudService],
  bootstrap: [AppComponent]
})
export class AppModule { }
