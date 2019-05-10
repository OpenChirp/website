import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material';
import {ConfirmationDialogComponent} from '../dialogs/confirmation-dialog.component';
import {LocationService} from '../../services/location.service';
// import {Location} from '../../models/location';

@Component({
  selector: 'select-location',
  templateUrl: 'select-location.component.html',
  styleUrls: ['select-location.component.scss']
})

export class SelectLocationComponent implements OnInit {
  locations: Array<any> = [];
  searchTerm = '';

  constructor(private router: Router, public dialog: MatDialog,
              private locationService: LocationService, public dialogRef: MatDialogRef<SelectLocationComponent>) {

  }

  ngOnInit() {
    this.locationService.getAllLocations().subscribe(
      result => this.locations = result,
      error => console.log(error.message)
    );
  }

  confirmSelect(location: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.componentInstance.dialogText = 'Change Location to ' + location.name + '?';
    dialogRef.componentInstance.confirmText = 'Confirm';
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.dialogRef.close(location.id);
        }
      }
    );
  }

  filtered() {
    if (this.searchTerm != '') {
      return this.locations.filter((x) => {
        if (typeof(x.name) == 'string') {
          const location_name: string = x.name;
          const name_match = location_name.toLowerCase().includes(this.searchTerm.toLowerCase());
          if (name_match) { return true; }
        }
        if (typeof(x.type) == 'string' && x.type) {
          const type_name: string = x.type;
          const type_match = type_name.toLowerCase().includes(this.searchTerm.toLowerCase());
          if (type_match) { return true; }
        }
        if (x.owner && x.owner.name) {
          const service_owner: string = x.owner.name;
          const owner_match = service_owner.toLowerCase().includes(this.searchTerm.toLowerCase());
          if (owner_match) { return true; }
        }
        const loc_id: string = x.id;
        const id_match = loc_id.toLowerCase().includes(this.searchTerm.toLowerCase());
        return id_match;
      });
    } else {
      return this.locations;
    }
  }

}
