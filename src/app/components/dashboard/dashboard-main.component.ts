import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../../services/device.service';
import { UserService } from '../../services/user.service';
import { ErrorDialogService } from '../../services/error-dialog.service';
import { SuccessDialogService } from '../../services/success-dialog.service';

@Component({
  selector: 'dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.scss']
})

export class DashboardMainComponent {
	shortcuts: Array<Object> = [];

  tiles = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

  constructor(private deviceService: DeviceService, 
              private userService: UserService,
              private successDialogService: SuccessDialogService, 
              private errorDialogService: ErrorDialogService) {

  }
  
  ngOnInit() {
    this.getShortcuts();
  }

  getShortcuts() {
    this.userService.getMyShortcuts().subscribe(
      out => {
         this.shortcuts = out;
      });    
  }  

  execute(shortcut: any) {
    this.deviceService.executeCommand(shortcut.device_id, shortcut.command_id).subscribe(
      result => {
        this.successDialogService
          .dialogPopup('Executed: ' + shortcut.name);
      },
      error => {
        this.errorDialogService
          .dialogPopup(error.message + ': ' + shortcut.name);
      }
    );
  }

}
