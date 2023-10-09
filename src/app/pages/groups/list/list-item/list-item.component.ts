import { Component, Input } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Groups } from 'src/app/shared/models/Groups';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {
  @Input() groups?: Groups;
  @Input() me?: User;
}
