import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Customer} from "../../models/customer.model";
import {CustomersService} from "../../services/customers/customers.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit{
  newCustomerFormGroup! : FormGroup;
  constructor(private fb : FormBuilder, private customerService : CustomersService, private router : Router) {
  }
  ngOnInit(): void {
    this.newCustomerFormGroup = this.fb.group({
      name : this.fb.control("", [Validators.required, Validators.minLength(5)]),
      email : this.fb.control("", [Validators.required, Validators.email])
    })
  }

  handleSaveCustomer() {
    let customer : Customer = this.newCustomerFormGroup.value;
    this.customerService.saveCustomers(customer).subscribe({
      next : value => {
        this.router.navigateByUrl("/customers");
      },
      error : err => {
        console.log(err);
      }
    })
  }
}
