import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Groups } from 'src/app/shared/models/Groups';
import { GroupPost } from 'src/app/shared/models/GroupPost';
import { GroupService } from 'src/app/shared/services/group.service';
import { GrouppostService } from 'src/app/shared/services/grouppost.service';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.scss'],
})
export class ListDetailComponent implements OnInit{
  group?: Groups;
  groupId?: string;
  message: string = "";
  groupPost: GroupPost[] = [];
  members: User [] = [];

  grouppostForm = this.newGroupPost({
    id: "",
    creator: "",
    post: "",
    date: 0,
    groupid: "",
    like: [],
    comments: [],
    });


  constructor(
    private groupService: GroupService,
    private groupPostService: GrouppostService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
  ){

  }

  ngOnInit(){
    this.route.params.subscribe((params: Params) => {
      this.groupId = params['id'];
      if (typeof this.groupId === 'string') {
        this.groupService.getById(this.groupId).subscribe((group: Groups | undefined) => {
          if (group) {
            this.group = group;
          }else{
            this.message = "HIBA! A keresett csoport nem található!"        
          }
        });
        this.groupPostService.getById(this.groupId).subscribe((groupPost: GroupPost | undefined) => {
          if (groupPost) {
            console.log(groupPost)
          }else{
            this.message = "Nem található post!"        
          }
        });
      }
    });
  }

  newGroupPost(model: GroupPost){
    let formGroup = this.fb.group(model);
    formGroup.get('creator')?.addValidators([Validators.required]);
    formGroup.get('post')?.addValidators([Validators.required, Validators.minLength(5)]);
    return formGroup
  }
}
