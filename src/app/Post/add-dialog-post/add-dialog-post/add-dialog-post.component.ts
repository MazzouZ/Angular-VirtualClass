import { Component, OnInit, Inject } from '@angular/core';
import { PostElement } from 'app/Post/post/post.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CrudService } from 'app/Services/crud.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-dialog-post',
  templateUrl: './add-dialog-post.component.html',
  styleUrls: ['./add-dialog-post.component.css']
})
export class AddDialogPostComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddDialogPostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PostElement,
    private crudService:CrudService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  public addPost() {
    this.data.dateDebut = Date.now();
    this.crudService.addItem('posts',this.data);
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
