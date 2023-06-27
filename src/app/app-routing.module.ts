import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomersComponent} from "./components/customers/customers.component";
import {AccountsComponent} from "./components/accounts/accounts.component";
import {NewCustomerComponent} from "./components/new-customer/new-customer.component";

const routes: Routes = [
  {path : "customers", component : CustomersComponent},
  {path : "accounts", component : AccountsComponent},
  {path : "new-customer", component : NewCustomerComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
