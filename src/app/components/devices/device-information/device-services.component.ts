import { Component, Input } from '@angular/core';
import { Router , ActivatedRoute} from '@angular/router';
import { Device } from '../../../models/device';
import { DeviceService } from '../../../services/device.service';
import { InfraService } from '../../../services/infraservice';
import { SuccessDialogService } from '../../../services/success-dialog.service';
import { ErrorDialogService } from '../../../services/error-dialog.service';
import { MdDialog } from '@angular/material';

import { SelectServiceComponent } from '../../infraservices/select-service.component';

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

	toService(id: string) {
		this.router.navigate(['/home/service/', id]);
	}

	linkService(newLink: any){
		this.deviceService.linkService(this.device._id, newLink._id, newLink.config).subscribe(
			result => {
				this.successDialogService
				.dialogPopup("Linked service: " + newLink.name);
			},
			error => {
				this.errorDialogService
				.dialogPopup(error.message + ': ' + newLink.name);
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