import { Component, OnInit } from '@angular/core';
import { CrudService } from 'app/Services/crud.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditDialogPostComponent } from '../edit-dialog-post/edit-dialog-post/edit-dialog-post.component';
import { AddDialogPostComponent } from '../add-dialog-post/add-dialog-post/add-dialog-post.component';
import { OnClickDialogPostComponent } from '../onClick-dialog-post/on-click-dialog-post/on-click-dialog-post.component';
import { ActivatedRoute } from '@angular/router';
import { parseJSON, param } from 'jquery';
import { Subscription } from 'rxjs';
import { InteractionService } from 'app/services/interaction.service';

export interface PostElement {
  id            : number
  titre         :String;
  description   :String;
  dateDebut     :number;
}

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  listPost :PostElement[];
  //public Cours;
  CoursP :any;
  sub : Subscription;
  constructor(private crudService:CrudService,public dialog: MatDialog,private _snackBar: MatSnackBar,
    private route:ActivatedRoute,private interactionService:InteractionService) { }

  ngOnInit(): void {
    this.getPosts();
    //this.test();

  }
  /*test(){
    this.interactionService.object$.subscribe(
      object =>{
        this.CoursP = object;
        console.log(this.CoursP);
       
      }
    );
    
  }*/

  getPosts() {
    this.crudService.getItems('posts').subscribe(
        (data) => {
          // @ts-ignore
          this.listPost = data._embedded.posts;    
        },error => {
          console.log(error);
        });
      }
  //---------------------------------------------------------------------
  onClickDialog(row) {
    const dialogRef = this.dialog.open(OnClickDialogPostComponent, {
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
openAddDialog(): void {
  const dialogRef = this.dialog.open(AddDialogPostComponent, {
    width: '500px',
    data: {}
  });
  dialogRef.afterClosed().subscribe(result => {
    setTimeout(()=>{
      this.getPosts();
    },1000);
  });
}
}
