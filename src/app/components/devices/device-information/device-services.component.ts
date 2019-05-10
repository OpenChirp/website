import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Device} from '../../../models/device';
import {DeviceService} from '../../../services/device.service';
import {InfraService} from '../../../services/infraservice';
import {SuccessDialogService} from '../../../services/success-dialog.service';
import {ErrorDialogService} from '../../../services/error-dialog.service';
import {MatDialog, Sort} from '@angular/material';
import {ConfirmationDialogComponent} from '../../dialogs/confirmation-dialog.component';

import {SelectServiceComponent} from '../../infraservices/select-service.component';
import {InputConfigComponent} from '../../dialogs/input-config.component';
import {UpdateConfigComponent} from '../../dialogs/update-config.component';

@Component({
  selector: 'device-services',
  templateUrl: './device-services.component.html',
  styleUrls: ['./device-services.component.scss']
})

export class DeviceServicesComponent implements OnChanges {
  @Input() device: Device;
  @Output() updateDevice: EventEmitter<boolean> = new EventEmitter();
  linkedServices: Array<any> = [];
  configs: any = {};
  statuses: any = {};
  services: Array<any> = [];
  sortedData: Array<any> = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private deviceService: DeviceService,
              private infraService: InfraService,
              private successDialogService: SuccessDialogService,
              private errorDialogService: ErrorDialogService,
              public dialog: MatDialog) {
  }

  ngOnChanges() {
    this.getLinkedServices();
  }

  getLinkedServices() {
    this.services = [];
    this.linkedServices = this.device.linked_services;
    for (let i = 0; i < this.linkedServices.length; i++) {
      const serviceId = this.linkedServices[i].service_id;
      this.configs[serviceId] = this.linkedServices[i].config;
      this.statuses[serviceId] = this.linkedServices[i].status;
      this.infraService.getServiceByID(serviceId).subscribe(
        result => {
          const service = Object();
          service._id = result._id;
          service.name = result.name;
          service.description = result.description;
          service.config = this.configs[service._id];
          service.status = this.statuses[service._id];
          this.services.push(service);
          if (this.services.length == this.linkedServices.length) {
            this.sortedData = this.services.slice();
          }
        });
    }
  }

  toService(id: string) {
    this.router.navigate(['/home/service/', id]);
  }

  invokeLinkServiceApi(device_id: string, service: any, config: any) {
    this.deviceService.linkService(this.device._id, service._id, config).subscribe(
      result => {
        this.successDialogService.dialogPopup('Linked service: ' + service.name);
        this.updateDevice.emit(true);
      },
      error => {
        this.errorDialogService.dialogPopup(error.message + ': ' + service.name);
      }
    );
  }

  linkService(newLink: any) {
    const configRequired = newLink.config_required;
    if (configRequired && configRequired.length > 0) {
      const dialogRef = this.dialog.open(InputConfigComponent, {width: '900px'});
      dialogRef.componentInstance.configRequired = configRequired;
      dialogRef.componentInstance.source = newLink.name;
      dialogRef.afterClosed().subscribe(
        result => {
          if (result) {
            this.invokeLinkServiceApi(this.device._id, newLink, result);
          }
        });
    } else {
      this.invokeLinkServiceApi(this.device._id, newLink, []);
    }
  }

  viewConfig(service: any) {
    const dialogRef = this.dialog.open(UpdateConfigComponent, {width: '900px'});
    dialogRef.componentInstance.config = service.config;
    dialogRef.componentInstance.source = service.name;
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.updateServiceLink(this.device._id, service, result);
        }
      });
  }

  updateServiceLink(device_id: string, service: any, config: any) {
    this.deviceService.updateServiceLink(this.device._id, service._id, config).subscribe(
      result => {
        this.successDialogService.dialogPopup('Updated config for: ' + service.name);
        this.updateDevice.emit(true);
      },
      error => {
        this.errorDialogService.dialogPopup(error.message + ': ' + service.name);
      });
  }

  removeServiceLink(service_id: string, name: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.componentInstance.dialogText = 'Remove link to service : ' + name + '?';
    dialogRef.componentInstance.confirmText = 'Remove';
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.deviceService.deleteServiceLink(this.device._id, service_id).subscribe(
            result => {
              this.successDialogService.dialogPopup('Link to service :' + name + ' removed');
              this.updateDevice.emit(true);
            },
            error => {
              this.errorDialogService.dialogPopup(error.message + ': ' + name);
            });
        }
      }
    );
  }

  selectService() {
    const dialogRef = this.dialog.open(SelectServiceComponent, {width: '800px', height: '700px'});
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.linkService(result);
        }
      });
  }

  sortData(sort: Sort) {
    const data = this.services.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }
    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return this.compare(a.name, b.name, isAsc);
        case 'status':
          return this.compare((a.status ? a.status.message : '-'), (b.status ? b.status.message : '-'), isAsc);
        case 'timestamp':
          return this.compare((a.status ? a.status.timestamp : '-'),
            (b.status ? b.status.timestamp : '-'), isAsc);
        default:
          return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
