import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrganisationElement, OrganisationsComponent } from 'app/organisations/organisations.component';
import { CrudService } from 'app/services/crud.service';
import { Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-dialog-organisation',
  templateUrl: './edit-dialog-organisation.component.html',
  styleUrls: ['./edit-dialog-organisation.component.css']
})
export class EditDialogOrganisationComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EditDialogOrganisationComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private crudService:CrudService,private _snackBar: MatSnackBar) {}
    ngOnInit(){

    }
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
    public updateOrg() {
      this.crudService.updateItem(this.data.organisation);
      this._snackBar.open('Element Modified',"",{
        duration: 2000,
        verticalPosition: 'top',
        panelClass: 'snackbarEdit'
      });
    }
}
  



