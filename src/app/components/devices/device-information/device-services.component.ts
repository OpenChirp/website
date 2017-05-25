import { Component, Input, Output, EventEmitter } from '@angular/core';
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
	@Output() updateDevice: EventEmitter<boolean> = new EventEmitter();
	linkedServices : Array<any> = [];
	services: Array<any> = [];
	
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
		 this.linkedServices = this.device.linked_services;  
		 
		//console.log(serviceIds);        
		for (var i = 0; i < this.linkedServices.length; i++) {
			this.infraService.getServiceByID(this.linkedServices[i].service_id).subscribe(
				result => {
					var service = Object();
					service._id = result._id;
					service.name = result.name;
					service.description = result.description;
					//service.config = this.linkedServices[i].config;
					this.services.push(service);

				}, 
				error => {
					var service = Object();
					service._id = this.linkedServices[i].service_id;
					service.name = "Service not found";
					service.config = this.linkedServices[i].config;
					this.services.push(service);
				}
				);
		}     
	} 

	
	
	toService(id: string) {
		this.router.navigate(['/home/service/', id]);
	}

	invokeLinkServiceApi(device_id: string, service: any, config: any){
		this.deviceService.linkService(this.device._id, service._id, config).subscribe(
			result => {
				this.successDialogService
				.dialogPopup("Linked service: " + service.name);
				this.updateDevice.emit(true);
				var newService = Object();
				newService._id = service._id;
				newService.name = service.name;
				newService.description = service.description;
				newService.config = config;
				this.services.push(newService);
			},
			error => {
				this.errorDialogService
				.dialogPopup(error.message + ': ' + service.name);
			}
			);
	}

	linkService(newLink: any){
		let configRequired = newLink.config_required;
		if(configRequired && configRequired.length > 0){
			let dialogRef = this.dialog.open(InputConfigComponent, { width: '600px' });
			dialogRef.componentInstance.configRequired = configRequired;
			dialogRef.componentInstance.source = newLink.name;
			dialogRef.afterClosed().subscribe(
				result => {
					if(result){
						this.invokeLinkServiceApi(this.device._id, newLink, result);					

					}
				}
				);
		}else{
			this.invokeLinkServiceApi(this.device._id, newLink, []
				);
		}
	}
	/*
    updateServiceLink(){
    	let dialogRef = this.dialog.open(InputConfigComponent, { width: '600px' });
			dialogRef.componentInstance.configRequired = configRequired;
			dialogRef.componentInstance.source = newLink.name;
			dialogRef.afterClosed().subscribe(
				result => {
					if(result){
						this.invokeLinkServiceApi(this.device._id, newLink, result);					

					}
				}
				);
    }*/

	removeServiceLink(service_id: string, name: string) {
		let dialogRef = this.dialog.open(ConfirmationDialogComponent);
		dialogRef.componentInstance.dialogText = "Remove link to service : " + name + "?";
		dialogRef.componentInstance.confirmText = "Remove";
		dialogRef.afterClosed().subscribe(
			result => {
				if (result) {
					this.deviceService.deleteServiceLink(this.device._id, service_id).subscribe(
						result => {
							this.successDialogService
							.dialogPopup('Link to service :' + name +" removed");
							this.updateDevice.emit(true);
							for(let i =0; i < this.services.length ; i ++){
								if(this.services[i]._id == service_id){
									this.services.splice(i, 1);
								}
							}
						},
						error => {
							this.errorDialogService
							.dialogPopup(error.message + ': ' + name);
							this.updateDevice.emit(true);
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