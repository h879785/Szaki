import { Component,ElementRef,OnChanges, OnInit, ViewChild, inject } from '@angular/core';
import { User } from 'src/app/shared/models/User';
import { Groups } from 'src/app/shared/models/Groups';
import { UserService } from 'src/app/shared/services/user.service';
import { GroupService } from 'src/app/shared/services/group.service';

import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, map, startWith } from 'rxjs';


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
  separatorKeysCodes: number[] = [ENTER];
  filteredFriends?: Observable<User[]>;
  memberCtrl = new FormControl('');
  @ViewChild('memberInput') memberInput: ElementRef<HTMLInputElement> | undefined;
  announcer = inject(LiveAnnouncer);


  groupForm = this.newGroup({
    id: "",
    name: "",
    creator: "",
    security: "",
    members: [],
    createdate: 0
    });

constructor(
  private fb: FormBuilder,
  private router: Router,
  private userService: UserService,
  private groupService: GroupService,

){
  /*this.filteredFriends = this.memberCtrl.valueChanges.pipe(
    startWith(''),
    map((friendName) => (friendName ? this.filterFriends(friendName) : this.myfriends.slice()))
  );*/
  
}

/*filterFriends(name: string): User[] {
  const filterValue = name.toLowerCase();
  //return this.myfriends.filter((friend) => friend.name?.firstname?.toLowerCase().indexOf(filterValue) === 0);
}*/

newGroup(model: Groups){
  let formGroup = this.fb.group(model);
  formGroup.get('name')?.addValidators([Validators.required, Validators.minLength(3)]);
  return formGroup
}

add(event: MatChipInputEvent): void {
//  const value = (event.value || '').trim();

  // Add our fruit
 // if (value) {
  //  this.members?.push(value);
  //}

  // Clear the input value
  //event.chipInput!.clear();

  //this.memberCtrl.setValue(null);
}

remove(member: User): void {
  const index = this.members?.indexOf(member);

  if (index && index >= 0) {
    this.members?.splice(index, 1);

    this.announcer.announce(`Removed ${member.name?.firstname && member.name?.lastname}`);
  
}

}

selected(event: MatAutocompleteSelectedEvent): void {
  if(this.members && this.memberInput){
    const selectedUser: User = event.option.value;
  this.members.push(selectedUser);
  this.memberInput.nativeElement.value = '';
  this.memberCtrl.setValue(null);
  }
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
    if(this.user?.friends?.length){
      for (let i = 0; i < this.user?.friends.length; i++) {
        this.userService.getById(this.user.friends[i]).subscribe(friend=>{
          if(friend)
          this.myfriends?.push(friend)

        })
      } 
    } 
  }, error => {
    console.error(error);
  });
  
}

addFriendToGroup(friendID: User): void {
  if (this.members && friendID && !this.members.includes(friendID)) {
    this.members.push(friendID);
  }
}
}