import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrganisationElement, OrganisationsComponent } from 'app/organisations/organisations.component';
import { CrudService } from 'app/services/crud.service';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-dialog-organisation',
  templateUrl: './add-dialog-organisation.component.html',
  styleUrls: ['./add-dialog-organisation.component.css']
})
export class AddDialogOrganisationComponent implements OnInit {

    constructor(
      public dialogRef: MatDialogRef<AddDialogOrganisationComponent>,
      @Inject(MAT_DIALOG_DATA) public data: OrganisationElement,
      private crudService:CrudService,private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
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
  public addOrg() {
     this.crudService.addItem('organisations',this.data);
      this._snackBar.open('Element Created',"",{
        duration: 2000,
        verticalPosition: 'top',
        panelClass: ['snackbarSuccess']
      });
  }

  submit() {

  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
