import { Component } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import { ErrorDialogService } from '../../../services/error-dialog.service';

@Component({
  selector: 'stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})

export class StatsComponent {
  stats: Array<any> = [];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService,
    private errorDialogService: ErrorDialogService
    ) {

  }

  ngOnInit() {
    this.getAllStats();
  }

  getAllStats() {
    this.adminService.getAllStats().subscribe(
      result => {
        this.stats = result;
      },
      error => {
        this.errorDialogService
        .dialogPopup(error.message );
      });
  }




}
