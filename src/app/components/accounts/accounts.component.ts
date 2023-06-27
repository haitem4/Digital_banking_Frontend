import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AccountsService} from "../../services/accounts/accounts.service";
import {Observable} from "rxjs";
import {AccountDetail} from "../../models/account.model";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit{
  accountFormGroup! : FormGroup;
  cuurentPage : number = 0;
  pageSize : number = 5;
  account$! : Observable<AccountDetail>;
  operationFormGroup! : FormGroup;
  constructor(private fb : FormBuilder, private accountService : AccountsService) {
  }
  ngOnInit(): void {
    this.accountFormGroup = this.fb.group({
      accountId : this.fb.control("")
    });
    this.operationFormGroup = this.fb.group({
      operationType : this.fb.control(""),
      amount : this.fb.control(0),
      description : this.fb.control(""),
      accountDestination : this.fb.control("")
    });
  }

  handleSearchAccount() {
    let accountId : string = this.accountFormGroup.value.accountId;
    this.account$ = this.accountService.getAccount(accountId, this.cuurentPage, this.pageSize);
  }

  gotoPage(page: number) {
    this.cuurentPage = page ;
    this.handleSearchAccount();
  }

  handleAccountOperation() {
    let accountId : string = this.accountFormGroup.value.accountId;
    let operationType : string = this.operationFormGroup.value.operationType;
    let amount : number = this.operationFormGroup.value.amount;
    let description : string = this.operationFormGroup.value.description;
    let accountDestination : string = this.operationFormGroup.value.accountDestination;
    if (operationType=='DEBIT'){
      this.accountService.debit(accountId,amount,description).subscribe({
        next : value => {
          alert("Debit Operation has been successfully executed !");
          this.operationFormGroup.reset();
          this.handleSearchAccount();
        }
      });
    } else if(operationType=='CREDIT'){
      this.accountService.credit(accountId,amount,description).subscribe({
        next : value => {
          alert("Credit Operation has been successfully executed !");
          this.operationFormGroup.reset();
          this.handleSearchAccount();
        }
      });
    } else if(operationType=='TRANSFERT'){
      this.accountService.transfert(accountId, accountDestination,amount,description).subscribe({
        next : value => {
          alert("Transfert Operation has been successfully executed !");
          this.operationFormGroup.reset();
          this.handleSearchAccount();
        }
      });
    }
  }
}
