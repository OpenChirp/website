import {switchMap, startWith, map} from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog} from '@angular/material';
import { SuccessDialogService } from '../../services/success-dialog.service';
import { ErrorDialogService } from '../../services/error-dialog.service';
import { ConfirmationDialogComponent } from '../dialogs/confirmation-dialog.component';
import { UserService } from '../../services/user.service';
import { GroupService } from '../../services/group.service';

import { User } from '../../models/user';


@Component({
  selector: 'group-members',
  templateUrl: './groupmembers.component.html',
  styleUrls: ['./groupmembers.component.scss']
})

export class GroupMembersComponent implements OnInit {
  memberForm: FormGroup;
  emailCtrl: FormControl;
  group: any = {};
  users: Array<any> = [];
  filteredUsers: any;
  members: Array<any> = [];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private groupService: GroupService,
    private userService: UserService,
    private successDialogService: SuccessDialogService,
    private errorDialogService: ErrorDialogService,
    public dialog: MatDialog ) {

  }

  ngOnInit() {

    this.loadGroup();
    this.memberForm = new FormGroup({
        user: new FormControl('', [<any>Validators.required]),
        write_access : new FormControl(false)
    });
    this.filteredUsers = this.memberForm.controls['user'].valueChanges.pipe(
         startWith(null),
         map(user => user && typeof user === 'object' ? user.email : user),
         map(email => email ? this.filter(email) : this.users.slice()));
  }

 filter(email: string)   {
     return this.users.filter(user => new RegExp(`^${email}`, 'gi').test(user.email));
  }

  displayEmail(user: any): string {
      return user ? user.email : user;
   }

  loadGroup() {
    this.route.params.pipe(
    switchMap((params: Params) => this.groupService.getGroupById(params['id'])))
    .subscribe(
      result => {
        this.group = result;
        this.getMembersOfGroup();
        this.getAllNonMembers();
      },
      error => this.router.navigate(['/home'])
      );
  }

  getMembersOfGroup() {
    this.groupService.getMembersOfGroup(this.group._id).subscribe(
      result => {
        this.members = result;
      },
      error => {
        this.errorDialogService
        .dialogPopup(error.message);
      });
  }

  getAllNonMembers() {
     this.groupService.getUsersNotInGroup(this.group._id).subscribe(
      result => {
        this.users = result;
        // this.userEmails = this.users.map(function(val:any) { return val.email ;});
      },
      error => {
        this.errorDialogService
        .dialogPopup(error.message);
      });
  }

  addUser(value: any) {
    if (!value.user) {
      this.errorDialogService.dialogPopup('No User selected');
      return;
    }
    const user = value.user;
    const write_access = value.write_access;
    this.groupService.addUserToGroup(this.group._id, user._id, write_access).subscribe(
      res =>  {
               this.loadGroup();
               this.memberForm.reset();
               this.successDialogService.dialogPopup('User added : ' + user.email )
             },
      err => this.errorDialogService.dialogPopup(err.message)
      );
  }

  removeUser(user: User) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.componentInstance.dialogText = 'Delete Member ' + user.email + '?';
    dialogRef.componentInstance.confirmText = 'Delete';
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.groupService.removeUserFromGroup(this.group._id, user._id).subscribe(
            result => {
              this.loadGroup();
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
