import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsRoutingModule } from './groups-routing.module';
import { GroupsComponent } from './groups.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import {MatSelectModule} from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ListComponent } from './list/list.component';
import { ListItemComponent } from './list/list-item/list-item.component';
import { ListDetailComponent } from './list-detail/list-detail.component';
import { PostListComponent } from './list-detail/post-list/post-list.component';
import { GroupPostCreatorComponent } from './group-post-creator/group-post-creator.component';
import { ManagingMembersComponent } from './managing-members/managing-members.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatMenuModule } from '@angular/material/menu';
import { PostCommentsComponent } from './list-detail/post-list/post-comments/post-comments.component';



@NgModule({
  declarations: [
    GroupsComponent,
    DialogComponent,
    ListComponent,
    ListItemComponent,
    ListDetailComponent,
    PostListComponent,
    GroupPostCreatorComponent,
    ManagingMembersComponent,
    PostCommentsComponent,

  ],
  imports: [
    CommonModule,
    GroupsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    FlexLayoutModule,
    MatDialogModule,
    MatSelectModule,
    MatChipsModule,
    MatSidenavModule,
    MatAutocompleteModule,
    SharedModule,
    MatMenuModule
  ]
})
export class GroupsModule { }


