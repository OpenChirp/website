import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Device } from '../../../models/device';
import { ErrorDialogService } from '../../../services/error-dialog.service';
import { SuccessDialogService } from '../../../services/success-dialog.service';
import { DeviceService } from '../../../services/device.service';
import { UserService } from '../../../services/user.service';
import { GroupService } from '../../../services/group.service';
import { MdDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../../dialogs/confirmation-dialog.component';

@Component({
  selector: 'device-acl',
  templateUrl: './device-acl.component.html',
  styleUrls: ['./device-acl.component.scss']
})

export class DeviceAclComponent {
  @Input() device: Device;
  memberForm: FormGroup; 
  emailCtrl: FormControl;
  allUsers: Array<any> = [];
  allGroups: Array<any> = [];
  deviceUsers: Array<any> = [];
  deviceGroups: Array<any> = [];
  filteredUsers: any;

  newGroup:any= null;
  newPerm: string;

  constructor(private deviceService: DeviceService, 
              private userService: UserService,
              private groupService: GroupService,
              private successDialogService: SuccessDialogService, 
              private errorDialogService: ErrorDialogService,
              public dialog: MdDialog,
              private router: Router, 
              ) {
  }

  ngOnInit() {
    this.getAllUsers();
    this.getAllGroups();
    this.getGroupsAcl();
    this.getUsersAcl();
    this.memberForm = new FormGroup({
        user: new FormControl('', [<any>Validators.required]),
        perm : new FormControl('')
    });
    this.filteredUsers = this.memberForm.controls['user'].valueChanges
         .startWith(null)
         .map(user => user && typeof user === 'object' ? user.email : user)
         .map(email => email ? this.filter(email) : this.allUsers.slice()); 

  }

  filter(email: string)   {
     return this.allUsers.filter(user => new RegExp(`^${email}`, 'gi').test(user.email)); 
  }
  
  displayEmail(user: any): string {
      return user ? user.email : user;
   }
  
  gotoGroup(id: string) {
    this.router.navigate(['/home/group', id ]);    
  }
  getAllUsers(){
    this.userService.getAllUsers().subscribe(
      result => {
        this.allUsers = result;
      },
      error => {
        this.errorDialogService
        .dialogPopup(error.message);
      });
  } 

  getAllGroups(){
    this.groupService.getAllGroups("").subscribe(
      result => {
        this.allGroups = result;
      },
      error => {
        this.errorDialogService
        .dialogPopup(error.message);
      });
  }

  getUsersAcl(){
    this.deviceService.getUsersAcl(this.device._id).subscribe(
      result => {
        if(result.length > 0) this.deviceUsers = result;
        else this.deviceUsers = [];
      },
      error => {
        this.errorDialogService
        .dialogPopup(error.message);
      });
  } 

  getGroupsAcl(){
    this.deviceService.getGroupsAcl(this.device._id).subscribe(
      result => {
         if(result.length > 0 ) this.deviceGroups = result;
         else this.deviceGroups = [];
      },
      error => {
        this.errorDialogService
        .dialogPopup(error.message);
      });
  }

  addUserAcl(value: any){
     var user = value.user;
     var body = { "perm": value.perm, "entity_type": "user" };
     this.deviceService.createAcl(this.device._id, user._id, body).subscribe(
      res =>  {             
               this.memberForm.reset();
               this.getUsersAcl();
               this.successDialogService.dialogPopup("User added : " +user.email);
             },
      err => this.errorDialogService.dialogPopup(err.message)
      );       
  }
  
  addGroupAcl(){
     var group = this.newGroup;
     var body = { "perm": this.newPerm, "entity_type": "group" };
     this.deviceService.createAcl(this.device._id, group._id, body).subscribe(
      res =>  {             
               this.newGroup = null;
               this.newPerm = "";
               this.getGroupsAcl();
               this.successDialogService.dialogPopup("Group added : " + group.name);
             },
      err => this.errorDialogService.dialogPopup(err.message)
      );       
  }

  removeUserAcl(user: any){
    let dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.componentInstance.dialogText = "Remove user " + user.email + "?";
    dialogRef.componentInstance.confirmText = "Remove ";
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.deviceService.deleteAcl(this.device._id, user._id).subscribe(
            result => {     
              this.getUsersAcl();       
              this.successDialogService
              .dialogPopup('Successfully removed: ' + user.email);
            },
            error => this.errorDialogService
            .dialogPopup(error.message )
            ); // End Delete  Subscribe
        } // End if
      } // End result
      ); // End subscribe

  } // End function

 removeGroupAcl(group: any){
    let dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.componentInstance.dialogText = "Remove group " + group.name + "?";
    dialogRef.componentInstance.confirmText = "Remove ";
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.deviceService.deleteAcl(this.device._id, group._id).subscribe(
            result => {     
              this.getGroupsAcl();       
              this.successDialogService
              .dialogPopup('Successfully removed: ' + group.name);
            },
            error => this.errorDialogService
            .dialogPopup(error.message )
            ); // End Delete  Subscribe
        } // End if
      } // End result
      ); // End subscribe

  } // End function

}