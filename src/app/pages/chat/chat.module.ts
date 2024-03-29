import { NgModule } from '@angular/core';

import { ChatRoutingModule } from './chat-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ChatComponent } from './chat.component';
import { FriendprofilesComponent } from './friendprofiles/friendprofiles.component';
import { MessangerComponent } from './messanger/messanger.component';
import { MatOptionModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FriendcardComponent } from './friendprofile/friendcard/friendcard.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ChatComponent,
    FriendprofilesComponent,
    MessangerComponent,
    FriendcardComponent,
  ],
  imports: [
    ChatRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatOptionModule,
    MatInputModule,
    MatButtonModule,
    FlexLayoutModule,
    MatCardModule,
    MatIconModule,
    MatSidenavModule,
    SharedModule
  ]
})
export class ChatModule { }
