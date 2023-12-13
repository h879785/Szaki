import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Groups } from 'src/app/shared/models/Groups';
import { Image } from 'src/app/shared/models/Image';
import { User } from 'src/app/shared/models/User';
import { GroupService } from 'src/app/shared/services/group.service';
import { GrouppostService } from 'src/app/shared/services/grouppost.service';
import { ImageService } from 'src/app/shared/services/image.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-managing-members',
  templateUrl: './managing-members.component.html',
  styleUrls: ['./managing-members.component.scss']
})
export class ManagingMembersComponent implements OnInit {

  @Input() me?: User;
  @Input() profilePic?: Image;
  @Input() group?: Groups;
  memberProfilePics: { [userId: string]: any } = {};
  alluser?: Array<User>
  allUserSubscription?: Subscription;
  owner?: User
  
  constructor(
    private userService: UserService,
    private groupService: GroupService,
    public dialog: MatDialog,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    
  }

  ngOnInit(): void {
    this.allUserSubscription = this.userService.getAll().subscribe(alluser=>{
      this.alluser = alluser;
    })
    this.userService.getById(this.data.group.creator).subscribe(owner=>{
      this.owner = owner
    })
    }
    

    getNotMemberUsers(): User[] {    
      if (this.alluser && this.data.group && this.data.group.members) {
    
        return this.alluser.filter(user => {
          const isModerator = (this.data.group.moderators || []).some((moderator: { id: string | undefined }) => moderator.id === user.id);
          const isMember = (this.data.group.members || []).some((member: { id: string | undefined }) => member.id === user.id);
          const isCreator = user.id === this.data.group.creator;
    
    
          const result = !isModerator && !isMember && !isCreator;
    
          return result;
        });
      }
    
      return [];
    }
    
    
    
    
    isModerator(){
      if(this.me && this.data.group.moderators.some((member: { id: string | undefined; }) => member.id === this.me?.id)){
        return true
      }
        return false
    }

    addNewMember(user: User) {
      try {
        if (!this.data.group.members.some((member: { id: string | undefined; }) => member.id === user.id)) {
          this.data.group.members.push(user);
          this.groupService.addMember(this.data.group.id, this.data.group.members);
          this.toastr.success("Sikeresen hozzáadtad a csoporthoz", "Sikeres");
        } else {
          this.toastr.warning("A felhasználó már a csoport tagja", "Figyelem");
        }
      } catch (error) {
        console.error(error);
        this.toastr.error("Nem sikerült hozzáadni a csoporthoz", "Hiba");
      }
    }

    addModerator(user: User){
      try {
        if (!this.data.group.moderators.some((member: { id: string | undefined; }) => member.id === user.id)) {
          this.data.group.moderators.push(user);
          this.groupService.addModerator(this.data.group.id, this.data.group.moderators);
          this.toastr.success("Sikeresen kinevezted moderátornak a csoporthoz", "Sikeres");
        } else {
          this.toastr.warning("Kinevezés sikertelen, már moderátor a csoportban!", "Figyelem");
        }
      } catch (error) {
        this.toastr.error("Nem sikerült moderátornak kinevezni", "Hiba");
      }
    }

    removeMember(user: User) {
      try {
        const indexToRemove = this.data.group.members.findIndex((member: { id: string | undefined; }) => member.id === user.id);
    
        if (indexToRemove !== -1) {
          this.data.group.members.splice(indexToRemove, 1);
          this.groupService.addMember(this.data.group.id, this.data.group.members);
          this.toastr.success("Sikeresen eltávolítottad a csoportból", "Sikeres");
        } else {
          this.toastr.warning("A felhasználó nem tagja a csoportnak", "Figyelem");
        }
      } catch (error) {
        this.toastr.error("Nem sikerült eltávolítani a felhasználót a csoportból", "Hiba");
      }
    }
    

    removeModerator(user: User) {
      try {
        const indexToRemove = this.data.group.moderators.findIndex((member: { id: string | undefined; }) => member.id === user.id);
    
        if (indexToRemove !== -1) {
          this.data.group.moderators.splice(indexToRemove, 1);
          this.groupService.addModerator(this.data.group.id, this.data.group.members);
          this.toastr.success("Sikeresen eltávolítottad a csoportból", "Sikeres");
        } else {
          this.toastr.warning("A felhasználó nem tagja a csoportnak", "Figyelem");
        }
      } catch (error) {
        this.toastr.error("Nem sikerült eltávolítani a felhasználót a csoportból", "Hiba");
      }
    }

    ngOnDestroy(): void {
      if (this.allUserSubscription) {
        this.allUserSubscription.unsubscribe();
      }
    }
}

