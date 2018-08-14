import {Component} from '@angular/core';
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

export class SelectLocationComponent {
  locations: Array<any> = [];
  searchTerm: string = '';

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
    let dialogRef = this.dialog.open(ConfirmationDialogComponent);
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
          let location_name: string = x.name;
          let name_match = location_name.toLowerCase().includes(this.searchTerm.toLowerCase());
          if (name_match) { return true; }
        }
        if (typeof(x.type) == 'string' && x.type) {
          let type_name: string = x.type;
          let type_match = type_name.toLowerCase().includes(this.searchTerm.toLowerCase());
          if (type_match) return true;
        }
        if (x.owner && x.owner.name) {
          let service_owner: string = x.owner.name;
          let owner_match = service_owner.toLowerCase().includes(this.searchTerm.toLowerCase());
          if (owner_match) return true;
        }
        let loc_id: string = x.id;
        let id_match = loc_id.toLowerCase().includes(this.searchTerm.toLowerCase());
        if (id_match) return true;
        return false;
      });
    } else {
      return this.locations;
    }
  }

}
