import {Component, OnInit, Inject, OnDestroy} from '@angular/core';
import {CrudService} from 'app/services/crud.service';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {PostElement} from 'app/Post/post/post.component';
import {EditDialogPostComponent} from 'app/Post/edit-dialog-post/edit-dialog-post/edit-dialog-post.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../../../services/auth.service';
import {map} from 'rxjs/operators';

export interface CommentaireElement {
  id            : number;
  label         :String;
  owner         :boolean;
  date          :number;
}
@Component({
    selector: 'app-on-click-dialog-post',
    templateUrl: './on-click-dialog-post.component.html',
    styleUrls: ['./on-click-dialog-post.component.css']
})
export class OnClickDialogPostComponent implements OnInit,OnDestroy {
  listPost :PostElement[];
  listCom : CommentaireElement[];
  Com : CommentaireElement = {id : 0,label : '',owner : false,date : 0};
  booksNames: string[]=[];
  
  constructor(public dialog: MatDialog,private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<OnClickDialogPostComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private crudService:CrudService,private http:HttpClient,
    private authService:AuthService) { }

  ngOnInit(): void {
      this.getFiles();
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
        this.crudService.getlinkItem(this.data.post._links.commentaires.href).subscribe(
            (data:any) => {
              this.listCom = data._embedded.commentaires;
              this.listCom.forEach(com => {
                  this.isCommentOwner(com);
              })
            },error => {
              console.log(error);
            });
          }

  isCommentOwner(comment){
      this.crudService.getlinkItem(comment._links.mzUser.href).subscribe((data:any) => {
          if (data.username === this.authService.currentUser().sub)
              comment.owner=true;
      });
  }
   //---------------------------------------------------------------------
   addCom(){
      if (this.Com.label != ''){
          this.Com.date = Date.now();
          //this.crudService.addItem('commentaires',this.Com);
          this.crudService.addLinkItem(this.Com,this.authService.currentUser().sub,this.data.post.id);
          setTimeout(()=>{
              this.Com.label='';
              this.getCom();
          },1000);
      }

    
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
deleteCom(row){
  this.crudService.deleteItem(row);
  setTimeout(()=>{
    this.getCom();
  },1000);
  this._snackBar.open('Element Deleted',"",{
    duration: 2000,
    verticalPosition: 'top',
    panelClass: ['snackbarDelete']
  });
}

submit() {

}    
    onFileComplete(data: any) {
        this.getFiles();
    }

    getFiles() {
        this.booksNames=[];
        this.http.get(this.data.post._links.postHasFiles.href,
            {headers:new HttpHeaders({'Authorization':this.authService.loadToken()})}).subscribe(
            (data: any) => {
                data._embedded.postHasFileses.forEach((PHF,i)=>{
                    this.http.get(PHF._links.fichier.href,
                        {headers:new HttpHeaders({'Authorization':this.authService.loadToken()})}).subscribe(
                        (data2: any) => {
                            this.booksNames[i]=data2.nom;
                        }
                        ,error => {
                            console.log(error);
                        }
                    )
                })

            },
                error => {
                console.log(error);
                });
    }

    getBook(book: string) {
        const httpOptions = {
            // 'responseType'  : 'arraybuffer' as 'json'
            'responseType'  : 'blob' as 'json'        //This also worked
        };
        this.http.get('http://localhost:8085/getFile/'+book, httpOptions).subscribe(
            (response:any) => {
                let file = new Blob([response], { type: 'application/pdf' });
                var fileURL = URL.createObjectURL(file);
                window.open(fileURL);
                },
                error => {console.log(error);});
    }

    deleteBook(book: string) {
        this.http.delete('http://localhost:8085/deleteFile/'+book,
            {headers:new HttpHeaders({'Authorization':this.authService.loadToken()})}).subscribe(
            (data: any) => {
                console.log(data);
                   this.getFiles();
            }
            ,error => {
                console.log(error);
            }
        );

    }
    ngOnDestroy(){

    }
}
