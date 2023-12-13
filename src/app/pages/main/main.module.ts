import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { PostComponent } from './post/post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { PostlistComponent } from './postlist/postlist.component';
import { FriendlistComponent } from './friendlist/friendlist.component';
import { PostItemComponent } from './postlist/post-item/post-item.component';
import { MatMenuModule } from '@angular/material/menu';
import { PostCommentsComponent } from './postlist/post-item/post-comments/post-comments.component';
import { PostCreatorComponent } from './post/post-creator/post-creator.component';
import { FriendlistItemComponent } from './friendlist/friendlist-item/friendlist-item.component';
import { SharedModule } from "../../shared/shared.module";



@NgModule({
    declarations: [
        MainComponent,
        PostComponent,
        PostlistComponent,
        FriendlistComponent,
        PostItemComponent,
        PostCreatorComponent,
        PostCommentsComponent,
        PostCreatorComponent,
        FriendlistItemComponent
    ],
    imports: [
        CommonModule,
        MainRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        FlexLayoutModule,
        MatMenuModule,
        SharedModule,
    ]
})
export class MainModule { }
