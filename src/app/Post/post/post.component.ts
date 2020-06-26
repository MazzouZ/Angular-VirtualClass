import { Component, OnInit } from '@angular/core';
import { CrudService } from 'app/services/crud.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditDialogPostComponent } from '../edit-dialog-post/edit-dialog-post/edit-dialog-post.component';
import { AddDialogPostComponent } from '../add-dialog-post/add-dialog-post/add-dialog-post.component';
import { OnClickDialogPostComponent } from '../onClick-dialog-post/on-click-dialog-post/on-click-dialog-post.component';
import { ActivatedRoute } from '@angular/router';
import { parseJSON, param } from 'jquery';
import { Subscription } from 'rxjs';
import { DevoirElement } from 'app/devoirs/devoirs.component';
import { SharingService } from 'app/services/sharing.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from 'app/services/auth.service';


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
  courP :any;
  sub : Subscription;
  listDevoirs :DevoirElement[];
  nbrComplet:number=0;
  nbrNonComplet:number=0;
  constructor(private crudService:CrudService,public dialog: MatDialog,private _snackBar: MatSnackBar,
    private route:ActivatedRoute,private interactionService:SharingService,
    private authService:AuthService,private http:HttpClient) {
       }

  ngOnInit(): void {
    this.courP = this.interactionService.sharingValue;
    console.log(this.courP);
    this.getPosts();
    this.getDevoirs();
    

  }

  // getPosts() {
  //   this.crudService.getItems('posts').subscribe(
  //       (data) => {
  //         // @ts-ignore
  //         this.listPost = data._embedded.posts;    
  //       },error => {
  //         console.log(error);
  //       });
  //     }

  getPosts() {
    this.crudService.getlinkItem(this.courP._links.posts.href).subscribe(
        (data) => {
          // @ts-ignore
          this.listPost = data._embedded.posts;    
        },error => {
          console.log(error);
        });
      }

      getDevoirs() {
        this.crudService.getCurrentUser().subscribe(
          (data1:any)=>{
           this.crudService.getlinkItem(data1._links.userHasDevoirs.href).subscribe(
            (data) => {
              // @ts-ignore
              data._embedded.userHasDevoirs.forEach((PHF,i)=>{
                this.http.get(PHF._links.devoir.href,
                  {headers:new HttpHeaders({'Authorization':this.authService.loadToken()})}).subscribe(
                  (data2: any) => {
                    this.nbrComplet=0;
                    this.nbrNonComplet=0;
                       if(PHF.etat)
                            this.nbrComplet++;
                       else
                            this.nbrNonComplet++;
                  }
                  ,error => {
                      console.log(error);
                  }
              )   
              });    
            },error => {
              console.log(error);
            });
          },error => {
            console.log(error);
          });
          }     
  //---------------------------------------------------------------------
  onClickDialog(row) {
    const dialogRef = this.dialog.open(OnClickDialogPostComponent, {
      width: '500px',
      data: {post :row},
      panelClass: 'myapp-no-padding-dialog'
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
    data: {courId : this.courP.id}
  });
  dialogRef.afterClosed().subscribe(result => {
    setTimeout(()=>{
      this.getPosts();
    },1000);
  });
}
//---------------------------------------------------------------------
  openModifyDialog(row) {
    const dialogRef = this.dialog.open(EditDialogPostComponent, {
      width: '500px',
      data: {post: row}
    });

    dialogRef.afterClosed().subscribe(result => {
      setTimeout(() => {
        this.getPosts();
      }, 1000);
    });
  }

  //---------------------------------------------------------------------
  deletePost(row) {
    this.crudService.deleteItem(row);
    setTimeout(() => {
      this.getPosts();
    }, 1000);
    this._snackBar.open('Element Deleted', '', {
      duration: 2000,
      verticalPosition: 'top',
      panelClass: ['snackbarDelete']
    });
  }
}
