import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AccountDetail} from "../../models/account.model";

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  backenHost : String = "http://localhost:8082";
  constructor(private http : HttpClient) { }

  public getAccount(accountId : string, page : number, size : number) : Observable<AccountDetail>{
    return this.http.get<AccountDetail>(this.backenHost+"/accounts/"+accountId+"/pageOperations?page="+page+"&size="+size);
  }

  public debit(accountId : String, amount : number, description : string){
    let data = {accountId, amount, description};
    return this.http.post(this.backenHost+"/accounts/debit",data);
  }

  public credit(accountId : String, amount : number, description : string){
    let data = {accountId, amount, description};
    return this.http.post(this.backenHost+"/accounts/credit",data);
  }

  public transfert(accountSource : String, accountDestination : String, amount : number, description : string){
    let data = {accountSource, accountDestination, amount, description};
    return this.http.post(this.backenHost+"/accounts/transfert",data);
  }
}
