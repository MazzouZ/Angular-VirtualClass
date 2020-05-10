import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UserData} from '../user-list.component';
import {CrudService} from '../../Services/crud.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-modify',
  templateUrl: './user-modify.component.html',
  styleUrls: ['./user-modify.component.css']
})
export class UserModifyComponent {

  constructor(
      public dialogRef: MatDialogRef<UserModifyComponent>,
      @Inject(MAT_DIALOG_DATA) public data,
      private crudService:CrudService) {}

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
  }

}
