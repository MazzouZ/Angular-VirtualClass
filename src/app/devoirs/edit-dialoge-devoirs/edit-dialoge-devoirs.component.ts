import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CrudService } from 'app/services/crud.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { data } from 'jquery';
@Component({
  selector: 'app-edit-dialoge-devoirs',
  templateUrl: './edit-dialoge-devoirs.component.html',
  styleUrls: ['./edit-dialoge-devoirs.component.css']
})
export class EditDialogeDevoirsComponent implements OnInit {
  startDate = this.data.devoir.dateFin;
  constructor(public dialogRef: MatDialogRef<EditDialogeDevoirsComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private crudService:CrudService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  submit() {
  
  }
  public updateDevoir() {
    this.crudService.updateItem(this.data.devoir);
    this._snackBar.open('Element Modified',"",{
      duration: 2000,
      verticalPosition: 'top',
      panelClass: 'snackbarEdit'
    });
  }

}
