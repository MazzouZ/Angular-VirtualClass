import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrganisationElement, OrganisationsComponent } from 'app/organisations/organisations.component';
import { CrudService } from 'app/Services/crud.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-dialog-organisation',
  templateUrl: './add-dialog-organisation.component.html',
  styleUrls: ['./add-dialog-organisation.component.css']
})
export class AddDialogOrganisationComponent implements OnInit {

    constructor(
      public dialogRef: MatDialogRef<AddDialogOrganisationComponent>,
      @Inject(MAT_DIALOG_DATA) public data: OrganisationElement,
      private crudService:CrudService) {}

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
  }

  submit() {

  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
