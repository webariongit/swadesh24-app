import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeleteMyAccountPageRoutingModule } from './delete-my-account-routing.module';

import { DeleteMyAccountPage } from './delete-my-account.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeleteMyAccountPageRoutingModule
  ],
  declarations: [DeleteMyAccountPage]
})
export class DeleteMyAccountPageModule {}
