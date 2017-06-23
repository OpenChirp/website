import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MdDialog, MdDialogRef } from '@angular/material';
import { SuccessDialogService } from '../../services/success-dialog.service';
import { ErrorDialogService } from '../../services/error-dialog.service';
import { ConfirmationDialogComponent } from '../dialogs/confirmation-dialog.component';
import { NewGroupComponent } from './newgroup.component';
import { UserService } from '../../services/user.service';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'group-members',
  templateUrl: './groupmembers.component.html',
  styleUrls: ['./groupmembers.component.scss']
})

export class GroupMembersComponent {
  group: any = {};
  users: Array<any> = [];
  userEmails : Array<string> = [];
  members: Array<any> = [];
  newMember: string ;

  constructor(private route: ActivatedRoute, 
    private router: Router, 
    private groupService: GroupService,
    private userService: UserService, 
    private successDialogService: SuccessDialogService,
    private errorDialogService: ErrorDialogService,
    public dialog: MdDialog ) {

  }

  ngOnInit() {
    this.getAllUsers();
    this.loadGroup();
  }

  
  getAllUsers(){
    this.userService.getAllUsers().subscribe(
      result => {
        this.users = result;
        this.userEmails = this.users.map(function(val:any) { return val.email ;});
      },
      error => {
        this.errorDialogService
        .dialogPopup(error.message);
      });
  }

  loadGroup(){
    this.route.params
    .switchMap((params: Params) => this.groupService.getGroupById(params['id']))
    .subscribe(
      result => {
        this.group = result;
        this.getMembersOfGroup();
      },
      error => this.router.navigate(['/home'])
      );
  }

  getMembersOfGroup(){
    this.groupService.getMembersOfGroup(this.group._id).subscribe(
      result => {
        this.members = result;
      },
      error => {
        this.errorDialogService
        .dialogPopup(error.message);
      });
  }
   displayEmail(user: any): string {
      return user ? user.email : user;
   }

  addUser(user:any){
            
    this.groupService.addUserToGroup(this.group._id, user._id).subscribe(
      res => this.successDialogService.dialogPopup("User added : " +user.email ),
      err => this.errorDialogService.dialogPopup(err.message)
      );       
  }
  

  removeUser(user: any){
    let dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.componentInstance.dialogText = "Delete Member " + user.email + "?";
    dialogRef.componentInstance.confirmText = "Delete";
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.groupService.removeUserFromGroup(this.group._id, user._id).subscribe(
            result => {
              this.successDialogService
              .dialogPopup('Successfully deleted: ' + user.email);
            },
            error => this.errorDialogService
            .dialogPopup(error.message )
            ); // End Delete  Subscribe
        } // End if
      } // End result
      ); // End subscribe

  } // End function



}