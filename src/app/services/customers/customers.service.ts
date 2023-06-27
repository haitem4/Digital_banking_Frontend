import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../../models/customer.model";

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  backenHost : String = "http://localhost:8082";

  constructor(private http : HttpClient) { }

  public getCustomers(): Observable<Customer[]>{
    return this.http.get<Customer[]>(this.backenHost+"/customers");
  }
  public searchCustomers(keyword : String): Observable<Customer[]>{
    return this.http.get<Customer[]>(this.backenHost+"/customers/search?keyword="+keyword);
  }
  public saveCustomers(customer : Customer): Observable<Customer>{
    return this.http.post<Customer>(this.backenHost+"/customers",customer);
  }
  public deleteCustomer(id : number){
    return this.http.delete(this.backenHost+"/customers/"+id);
  }
}
