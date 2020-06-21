import { Component, OnInit, Inject } from '@angular/core';
import { CoursElement } from 'app/Cours/cours/cours.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CrudService } from 'app/services/crud.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-add-dialoge-cours',
  templateUrl: './add-dialoge-cours.component.html',
  styleUrls: ['./add-dialoge-cours.component.css']
})
export class AddDialogeCoursComponent implements OnInit {
  //objectCours : any;
  objUser : any;
  objOrg : any;
  constructor(public dialogRef: MatDialogRef<AddDialogeCoursComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CoursElement,
    private crudService:CrudService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    //this.crudService.getCurrentUser();
    this.crudService.getCurrentUser().subscribe(
      data =>{
        console.log(data);
        this.objUser = data;
      },error => {
        console.log(error);
      });
  }

  public getUserOrg()
  {
    this.crudService.getlinkItem(this.objUser._links.organisation.href).subscribe(
    data =>{
        console.log(data);
        this.objOrg = data;
        this.crudService.linkItemCoursOrg('courses',this.data,this.objOrg._links.self.href);
    },error => {
      console.log(error);
    }
  );

  }


  public addCours() {
    this.getUserOrg();
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
