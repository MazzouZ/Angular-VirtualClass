import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CrudService } from 'app/Services/crud.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-dialog-post',
  templateUrl: './edit-dialog-post.component.html',
  styleUrls: ['./edit-dialog-post.component.css']
})
export class EditDialogPostComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditDialogPostComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private crudService:CrudService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  submit() {
  
  }
  public updatePost() {
    this.crudService.updateItem(this.data.post);
    this._snackBar.open('Element Modified',"",{
      duration: 2000,
      verticalPosition: 'top',
      panelClass: 'snackbarEdit'
    });
  }

}
