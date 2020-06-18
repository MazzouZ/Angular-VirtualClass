import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UserData, UserListComponent} from '../user-list.component';
import {FormControl, Validators} from '@angular/forms';
import {CrudService} from '../../services/crud.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent {

  constructor(
      public dialogRef: MatDialogRef<UserAddComponent>,
      @Inject(MAT_DIALOG_DATA) public data,
      private crudService:CrudService,private _snackBar: MatSnackBar) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  formControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Ce champ est obligatoire' :
        this.formControl.hasError('email') ? 'Entrez un email valide !!' :
            '';
  }
  public addUser() {
     this.crudService.addItem('mzUsers',this.data);
     this._snackBar.open('Element Created',"",{
      duration: 2000,
      verticalPosition: 'top',
      panelClass: ['snackbarSuccess']
    });
  }

  submit() {

  }
}
