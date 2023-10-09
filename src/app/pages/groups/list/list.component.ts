import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Groups } from 'src/app/shared/models/Groups';
import { User } from 'src/app/shared/models/User';
import { GroupService } from 'src/app/shared/services/group.service';
import { UserService } from 'src/app/shared/services/user.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit,OnDestroy{
  groups: Groups[] = [];
  me?: User;
  subscription?: Subscription;

  constructor(
    private groupService: GroupService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
    ){ }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    this.subscription = this.userService.getById(user.uid).subscribe(user=>{
      this.me=user;      
    })
    this.groupService.getAll().subscribe(groups=>{
      this.groups = groups
      console.log(this.groups)
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
