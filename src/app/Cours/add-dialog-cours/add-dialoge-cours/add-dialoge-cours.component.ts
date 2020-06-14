import { Component, OnInit, Inject } from '@angular/core';
import { CoursElement } from 'app/Cours/cours/cours.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CrudService } from 'app/Services/crud.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-dialoge-cours',
  templateUrl: './add-dialoge-cours.component.html',
  styleUrls: ['./add-dialoge-cours.component.css']
})
export class AddDialogeCoursComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddDialogeCoursComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CoursElement,
    private crudService:CrudService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  public addCours() {
    this.crudService.addItem('courses',this.data);
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
