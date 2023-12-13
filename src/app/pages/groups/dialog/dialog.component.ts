import { Component,OnChanges, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/User';
import { Groups } from 'src/app/shared/models/Groups';
import { UserService } from 'src/app/shared/services/user.service';
import { GroupService } from 'src/app/shared/services/group.service';

import { FormBuilder, Validators } from '@angular/forms';

import { Observable } from 'rxjs';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnChanges,OnInit {
  

  user?:User;
  group?:Groups;
  myfriends?: Array<User> =[];
  members?: Array<User> =[];
  filteredFriends?: Observable<User[]>;


  groupForm = this.newGroup({
    id: "",
    name: "",
    creator: "",
    security: "",
    members: [],
    moderators: [],
    createdate: 0
    });

constructor(
  private fb: FormBuilder,
  private userService: UserService,
  private groupService: GroupService,

){

  
}

newGroup(model: Groups){
  let formGroup = this.fb.group(model);
  formGroup.get('name')?.addValidators([Validators.required, Validators.minLength(3)]);
  return formGroup
}


createGroup(){
  if(this.groupForm.valid && this.user?.id){

    this.members?.push(this.user)

    if(this.groupForm.get('name')!==null && this.groupForm.get('security')!==null){

      const newgroup: Groups = {
        id: '',
        creator: this.user.id,
        name: this.groupForm.get("name")?.value as string,
        security: this.groupForm.get("security")?.value as string,
        members: this.members,
        createdate: new Date().getTime(),
        moderators: [],
      };

      this.groupService.createGroup(newgroup).then(_ => {
        console.log(this.groupForm.value)
      }).catch(error => {
        console.error(error);
      });
    }
  }
}

ngOnChanges() {}
ngOnInit(){
  const user = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
  this.userService.getById(user.uid).subscribe(data => {
    this.user = data; 
  }, error => {
    console.error(error);
  });
  
}
}