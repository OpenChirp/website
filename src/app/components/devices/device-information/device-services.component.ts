import { Component, Input } from '@angular/core';
import { Router , ActivatedRoute} from '@angular/router';
import { Device } from '../../../models/device';
import { DeviceService } from '../../../services/device.service';
import { InfraService } from '../../../services/infraservice';
import { SuccessDialogService } from '../../../services/success-dialog.service';
import { ErrorDialogService } from '../../../services/error-dialog.service';
import { MdDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../../dialogs/confirmation-dialog.component';

import { SelectServiceComponent } from '../../infraservices/select-service.component';
import { InputConfigComponent } from '../../dialogs/input-config.component';

@Component({
	selector: 'device-services',
	templateUrl: './device-services.component.html',
	styleUrls: ['./device-services.component.scss']
})

export class DeviceServicesComponent {
	@Input() device: Device;
	services: Array<Object> = []
	
	constructor(private route: ActivatedRoute,
		private router: Router, 
		private deviceService: DeviceService,
		private infraService: InfraService,
		private successDialogService: SuccessDialogService,
		private errorDialogService: ErrorDialogService,              
		public dialog: MdDialog) {

	}
	ngOnInit() {
		this.getLinkedServices();

	}
	
	getLinkedServices() {
		var serviceIds = this.device.linked_services.map((x: any) => x.service_id);          
		for (var i = 0; i < serviceIds.length; i++) {
			this.infraService.getServiceByID(serviceIds[i]).subscribe(
				result => {
					this.services.push(result);

				}, 
				error => {
					console.log(error.message);
				}
				);
		}     
	} 

	reloadServices(){
		this.services = [];
		this.getLinkedServices();
	}
	
	toService(id: string) {
		this.router.navigate(['/home/service/', id]);
	}


	linkService(newLink: any){
		let configRequired = newLink.config_required;
		let dialogRef = this.dialog.open(InputConfigComponent, { width: '600px' });
		dialogRef.componentInstance.configRequired = configRequired;
		dialogRef.componentInstance.source = newLink.name;
		dialogRef.afterClosed().subscribe(
			result => {
				if(result) {
					this.deviceService.linkService(this.device._id, newLink._id, result).subscribe(
						result => {
							this.successDialogService
							.dialogPopup("Linked service: " + newLink.name);
							this.services.push(newLink);
						},
						error => {
							this.errorDialogService
							.dialogPopup(error.message + ': ' + newLink.name);
						}
						);
				}
			}
			);
	}
	removeServiceLink(service_id: string, name: string) {
	    let dialogRef = this.dialog.open(ConfirmationDialogComponent);
	    dialogRef.componentInstance.dialogText = "Remove link to service:" + name + "?";
	    dialogRef.componentInstance.confirmText = "Remove";
	    dialogRef.afterClosed().subscribe(
	      result => {
	        if (result) {
	          this.deviceService.deleteServiceLink(this.device._id, service_id).subscribe(
	            result => {
	              this.successDialogService
	                .dialogPopup('Link to service :' + name +" removed");
	              this.reloadServices();
	            },
	            error => {
	              this.errorDialogService
	                .dialogPopup(error.message + ': ' + name);
	              this.reloadServices();
	            }
	          );
	        }
	      }
	    );
    }

	selectService() {
		var dialogRef = this.dialog.open(SelectServiceComponent, { width: '800px', height: '700px' });
		dialogRef.afterClosed().subscribe(
			result => {
				if(result) {					
					this.linkService(result);
				}
			});
	}


}