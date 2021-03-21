import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  accountNumber : number = 20801149;
  name : string = "Kam";
  balance : number = 0.0;

  withdraw(money:number){
    this.balance -= money;
  }
  deposit(money:number){
    this.balance += money;
  }
  checkBalance(){
    return this.balance;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
