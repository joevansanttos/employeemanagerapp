import { EmployeeService } from './employee.service';
import { Employee } from './employee';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public employees!: Employee[];

  public editEmployee!:Employee;

  public deleteEmployee!:Employee;

  constructor(private employeeService:EmployeeService) { }

  ngOnInit(){
    this.getEmployees();
  }

  public getEmployees():void{
    this.employeeService.getEmployees().subscribe(
      (response:Employee[]) => {
        this.employees = response;
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onAddEmployee(addForm:NgForm) : void{
    document.getElementById('add-employee-form')?.click();
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response:Employee) => {
        console.log(response);
        this.getEmployees();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateEmployee(employee:Employee) : void{
    this.employeeService.updateEmployee(employee).subscribe(
      (response:Employee) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteEmployee(employeeId:number) : void{
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response:void) => {
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  public onOpenModal(employee:Employee | null, mode:string) :void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (mode === 'edit') {
      if(employee != null){
        this.editEmployee = employee;
      }
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if (mode === 'delete') {
      if(employee != null){
        this.deleteEmployee = employee;
      }

      button.setAttribute('data-target', '#deleteEmployeeModal');
    }

    container!.appendChild(button);
    button.click();
  }


}
