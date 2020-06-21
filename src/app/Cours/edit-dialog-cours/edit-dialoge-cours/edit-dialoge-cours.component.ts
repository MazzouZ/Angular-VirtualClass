import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CrudService } from 'app/services/crud.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-dialoge-cours',
  templateUrl: './edit-dialoge-cours.component.html',
  styleUrls: ['./edit-dialoge-cours.component.css']
})
export class EditDialogeCoursComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditDialogeCoursComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private crudService:CrudService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  submit() {
  
  }
  public updateCours() {
    this.crudService.updateItem(this.data.cours);
    this._snackBar.open('Element Modified',"",{
      duration: 2000,
      verticalPosition: 'top',
      panelClass: 'snackbarEdit'
    });
  }

}
