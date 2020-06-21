import { Component, OnInit, Inject } from '@angular/core';
import { CrudService } from 'app/Services/crud.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { PostElement } from 'app/Post/post/post.component';
import { EditDialogPostComponent } from 'app/Post/edit-dialog-post/edit-dialog-post/edit-dialog-post.component';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface CommentaireElement {
  id            : number;
  label         :String;
  date          :number;
}
@Component({
  selector: 'app-on-click-dialog-post',
  templateUrl: './on-click-dialog-post.component.html',
  styleUrls: ['./on-click-dialog-post.component.css']
})
export class OnClickDialogPostComponent implements OnInit {
  listPost :PostElement[];
  listCom : CommentaireElement[];
  Com : CommentaireElement = {id : 0,label : '',date : 0};
  
  constructor(public dialog: MatDialog,private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<OnClickDialogPostComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private crudService:CrudService) { }

  ngOnInit(): void {
    this.getCom();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  getPosts() {
    this.crudService.getItems('posts').subscribe(
        (data) => {
          // @ts-ignore
          this.listPost = data._embedded.posts;    
        },error => {
          console.log(error);
        });
      }

  getCom() {
        this.crudService.getItems('commentaires').subscribe(
            (data) => {
              // @ts-ignore
              this.listCom = data._embedded.commentaires;    
            },error => {
              console.log(error);
            });
          }    
   //---------------------------------------------------------------------
   addCom(){
     this.Com.date = Date.now();
     this.crudService.addItem('commentaires',this.Com);
   }
   //---------------------------------------------------------------------
   openModifyDialog(row) {
    const dialogRef = this.dialog.open(EditDialogPostComponent, {
      width: '500px',
      data: {post :row}
    });

    dialogRef.afterClosed().subscribe(result => {
      setTimeout(()=>{
        this.getPosts();
      },1000);
    });
  }
  //---------------------------------------------------------------------
deletePost(row){
  this.crudService.deleteItem(row);
  setTimeout(()=>{
    this.getPosts();
  },1000);
  this._snackBar.open('Element Deleted',"",{
    duration: 2000,
    verticalPosition: 'top',
    panelClass: ['snackbarDelete']
  });
}

submit() {

}    

}
