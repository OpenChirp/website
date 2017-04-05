import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';

import { LocationService } from '../resources/location.service';
import { Location } from '../resources/location';

@Component({
  selector: 'tree-node',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})

export class TreeNodeComponent {
  @Input() currentLocation: Location;

  childLocations: Array<Location> = [];
  errorMesssage: string;
  showChildren: boolean = false;

  constructor(private locationService: LocationService, private router: Router, public dialog: MdDialog, public snackBar: MdSnackBar) {
    
  }

  getChildren(curLocation: Location) {
    let children = curLocation.children;
    this.childLocations = [];
    for (var i = 0; i < children.length; i++) {
      this.locationService
        .getLocationById(children[i])
        .subscribe(
          result => this.childLocations.push(result),
          error => this.errorMesssage = error
        );
    }
  }

  clearChildren() {
    this.childLocations = [];
  }
  
  toggleChildren(curLocation: Location) {
    if (this.showChildren) {
      this.clearChildren();
      this.showChildren = false;
    }
    else {
      this.getChildren(curLocation);
      this.showChildren = true;
    }
    this.toDevices(curLocation._id);
  }

  addLocation(location: Location) {
    this.router.navigate(['/home/newlocation', location._id]);
  }

  toDevices(location_id: string) {
    this.locationService.getDeviceByLocationId(location_id).subscribe(
      result =>  {
        if (result.length != 0) {
          this.router.navigate(['/home/devices/', location_id]);
        }
        else {
          this.router.navigate(['/home']);
        }
      },
      error => this.errorMesssage = error
    )
  }

  deleteLocation(location: Location) {
    let dialogRef = this.dialog.open(DeleteLocationDialog);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.locationService
          .deleteLocationById(location._id)
          .subscribe(
            res => {
              this.snackBar.open("Delete location success!", location.name, { duration: 2000 });
            },
            err => {
              this.snackBar.open(err, location.name, { duration: 2000 });
            }
          )
      }
    });
  }
}

@Component({
  selector: 'delete-location-dialog',
  template: `
    <h2>Confirmation of Deletion</h2>
    <button md-raised-button (click)="dialogRef.close(true)">Delete</button>
    <button md-raised-button (click)="dialogRef.close(false)">Cancel</button>
  `
})
export class DeleteLocationDialog {
  constructor(public dialogRef: MdDialogRef<DeleteLocationDialog>) {

  }
}