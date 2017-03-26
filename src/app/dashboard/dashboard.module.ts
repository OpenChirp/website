import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DeviceComponent } from '../devices/device.component';
import { DeviceListComponent } from '../devices/devicelist.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    DeviceComponent,
    DeviceListComponent
  ]
})
export class HeroesModule {}