import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { MdInputModule, MdSnackBar, MdDialog } from '@angular/material';
import { InfraService } from '../../services/infraservice';

import { SuccessDialogService } from '../../services/success-dialog.service';
import { ErrorDialogService } from '../../services/error-dialog.service';

@Component({
  selector: 'new-infra-service',
  templateUrl: './new.infraservice.component.html',
  styleUrls: ['./new.infraservice.component.scss']
})

export class NewInfraServiceComponent {
  name: string = "";
  description: string = "";

  constructor(private route: ActivatedRoute, private infraService: InfraService, private router: Router,
    private successDialogService: SuccessDialogService, 
    private errorDialogService: ErrorDialogService,
     public snackBar: MdSnackBar
   ) {

  }

  add() {
    if(this.name != "" && this.description != "") {
      var body: any = {
        name: this.name,
        description: this.description,
       
      };

      this.infraService.createService(body).subscribe(
        createdService => {
          
         
          this.successDialogService.dialogPopup("Service Created "+this.name).subscribe(
            result => this.router.navigate(['/home/service/'+createdService._id])
          );
        },
        error => {           
            this.errorDialogService
              .dialogPopup(error.message + ': ' + this.name);
          }
      );

    }
    else {
      this.snackBar.open("Name and description are empty!", "ERROR", { duration: 2000 });
    }
  }

  cancel() {
    this.router.navigate(['/home']);
  }

 
  
}