import {Component, OnInit} from '@angular/core';
import {InfraService} from '../../services/infraservice';
import {Router} from '@angular/router';

@Component({
  selector: 'services',
  templateUrl: './list.infraservices.component.html',
  styleUrls: ['list.infraservices.component.scss']
})

export class ListInfraServicesComponent implements OnInit {

  services: Array<Object> = [];

  constructor(private infraService: InfraService, private router: Router) {

  }

  ngOnInit() {
    this.infraService.getAllServices().subscribe(
      result => this.services = result,
      error => console.log(error.message)
    );
  }

  gotoService(id: string) {
    this.router.navigate(['/home/service/', id]);
  }

  newService() {
    this.router.navigate(['/home/newservice']);
  }

}
