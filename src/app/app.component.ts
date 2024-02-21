import { Component, OnInit ,ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeeService } from './services/employee.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'crud_operation';
  empdisplayForm!:any;
  value:boolean=false;
  

  loginchange(){
   const dialogRef = this._dialog.open(LoginComponent);
    this.value=true;
  }
  displayedColumns: string[] = ['id','firstname', 'lastname', 'email','dob','gender','action'];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private _dialog:MatDialog, private _empService:EmployeeService){ 

  }
  ngOnInit(): void {
   this.empdisplayForm=this.getEmployeeList();
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(EmpAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: val => {
        if(val){
          this.getEmployeeList();
        }
      },
      error: err => console.log(err)
    })
  }

  getEmployeeList(){
    this._empService.getEmployee().subscribe({
      next: (res)=>{
       this.dataSource=new MatTableDataSource(res);
       this.dataSource.sort=this.sort;
       this.dataSource.paginator=this.paginator;
        
      },
      error: (err)=>{
        console.log(err);
        
      },
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  } 

  

  onDelete(id:string){
    this._empService.deleteEmployee(id).subscribe({
      next: (res)=>{
        alert('Employee deleted successfully...');
        this.getEmployeeList();
      },
      error: (err)=>{
        console.log(err);
        
      }
    })
  }

  openEditForm(data:any){
    const DialogRef =this._dialog.open(EmpAddEditComponent,{
      data,
    });

    DialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val) {
            this.getEmployeeList();
        }
      }
    })
  }
}


