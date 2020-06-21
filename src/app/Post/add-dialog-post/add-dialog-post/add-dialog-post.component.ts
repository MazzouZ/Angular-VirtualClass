import { Component, OnInit, Inject } from '@angular/core';
import { PostElement } from 'app/Post/post/post.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CrudService } from 'app/Services/crud.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InteractionService } from 'app/services/interaction.service';
import { CoursElement } from 'app/Cours/cours/cours.component';

@Component({
  selector: 'app-add-dialog-post',
  templateUrl: './add-dialog-post.component.html',
  styleUrls: ['./add-dialog-post.component.css']
})
export class AddDialogPostComponent implements OnInit {
  CoursP :CoursElement= {id : 0,label : '',code:'',specialite:''};
  constructor(public dialogRef: MatDialogRef<AddDialogPostComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private crudService:CrudService,private _snackBar: MatSnackBar,private interactionService:InteractionService) 
    { }

  ngOnInit(){
    this.test();
  }

  test(){
    this.interactionService.object$.subscribe(
        object =>{
          this.CoursP = object._links.self.href; 
          console.log(object);
        }
      );
    
  }

  public addPost() {
    this.data.dateDebut = Date.now();
    this.crudService.linkItemPostCours('posts',this.data,this.CoursP);
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
