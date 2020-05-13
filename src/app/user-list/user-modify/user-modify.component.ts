import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UserData} from '../user-list.component';
import {CrudService} from '../../Services/crud.service';
import {FormControl, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-modify',
  templateUrl: './user-modify.component.html',
  styleUrls: ['./user-modify.component.css']
})
export class UserModifyComponent {

  constructor(
      public dialogRef: MatDialogRef<UserModifyComponent>,
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
  submit() {

  }
  public updateUser() {
    this.crudService.updateItem(this.data.user);
    this._snackBar.open('Element Modified',"",{
      duration: 2000,
      verticalPosition: 'top',
      panelClass: 'snackbarEdit'
    });
  }

}
