import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';

import { InfraService } from '../../services/infraservice';

@Component({
  selector: 'select-service',
  templateUrl: 'select-service.component.html',
  styleUrls: ['select-service.component.scss']
})

export class SelectServiceComponent {
  services: Array<any> = [];
  searchTerm: string = "";

  constructor(private router: Router, private infraService: InfraService, public dialogRef: MatDialogRef<SelectServiceComponent>) {

  }

  ngOnInit() {
    this.infraService.getAllServices().subscribe(
      result => this.services = result,
      error => console.log(error.message)
    );
  }

  select(service: any) {
    this.dialogRef.close(service);
  }

  getPermissionName(perm: number){
    if(perm == 0){
      return "Read";
    }else if(perm == 1){
      return "Execute";
    }else if(perm == 2){
      return "Write";
    }
  }

  filtered() {
    if (this.searchTerm != "") {
      return this.services.filter((x) => {
        if (typeof(x.name) == "string" && typeof(x.description == "string") && typeof(x.owner == "string")) {
          var template_name: string = x.name;
          var name_match = template_name.toLowerCase().includes(this.searchTerm.toLowerCase());
          if (name_match) return true;

          if(x.description){
            var service_description: string = x.description;
            var description_match = service_description.toLowerCase().includes(this.searchTerm.toLowerCase());
            if (description_match) return true;
          }
          if (x.owner.name) {
            var service_owner: string = x.owner.name;
            var owner_match = service_owner.toLowerCase().includes(this.searchTerm.toLowerCase());
          }
          else {
            var service_owner: string = x.owner.email;
            var owner_match = service_owner.toLowerCase().includes(this.searchTerm.toLowerCase());
          }
          if (owner_match) return true;
        }
        return false;
      });
    }
    else {
      return this.services;
    }
  }

}
