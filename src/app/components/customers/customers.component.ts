import {Component, OnInit} from '@angular/core';
import {CustomersService} from "../../services/customers/customers.service";
import {catchError, map, Observable, throwError} from "rxjs";
import {Customer} from "../../models/customer.model";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit{
  customers! : Observable<Customer[]>;
  errorMessage! : String;
  searchFormGroup : FormGroup | undefined;
  constructor(private customerService : CustomersService, private fb : FormBuilder) {
  }
  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword : this.fb.control("")
    });

    this.customers=this.customerService.getCustomers().pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );
  }

  handleSearchCustomers() {
    let keyword = this.searchFormGroup?.value.keyword;
    this.customers=this.customerService.searchCustomers(keyword).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );
  }

  handleDeleteCustomer(c: Customer) {
    let conf = confirm("Are you sure ?");
    if (!conf) return;
    this.customerService.deleteCustomer(c.id).subscribe({
      next : (value) => {
        this.customers = this.customers.pipe(
          map(data => {
            let number = data.indexOf(c);
            data.slice(number,1);
            return data;
          })
        )
      }
    });
  }
}
