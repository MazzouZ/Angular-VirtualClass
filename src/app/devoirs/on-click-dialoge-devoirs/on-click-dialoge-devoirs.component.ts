import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CrudService } from 'app/services/crud.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'app/services/auth.service';
import { DevoirElement } from '../devoirs.component';
import { CommentaireElement } from 'app/Post/onClick-dialog-post/on-click-dialog-post/on-click-dialog-post.component';

@Component({
  selector: 'app-on-click-dialoge-devoirs',
  templateUrl: './on-click-dialoge-devoirs.component.html',
  styleUrls: ['./on-click-dialoge-devoirs.component.css']
})
export class OnClickDialogeDevoirsComponent implements OnInit {
  
  //listPost :DevoirElement[];
  listCom : CommentaireElement[];
  Com : CommentaireElement = {id : 0,label : '',date : 0};
  booksNames: string[]=[];

  constructor(public dialog: MatDialog,private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<OnClickDialogeDevoirsComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private crudService:CrudService,private http:HttpClient,
    private authService:AuthService) { }

  ngOnInit(): void {
      this.getCom();
      this.getFiles();
    }
    onNoClick(): void {
      this.dialogRef.close();
    }

    getCom() {
          this.crudService.getlinkItem(this.data.devoir._links.commentaires.href).subscribe(
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
       //this.crudService.addItem('commentaires',this.Com);
       this.crudService.addLinkItemDevoir(this.Com,this.authService.currentUser().sub,this.data.devoir.id);
       setTimeout(()=>{
        this.Com.label='';
        this.getCom();
      },1000);
      
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
          this.http.get(this.data.devoir._links.devoirHasFiles.href,
              {headers:new HttpHeaders({'Authorization':this.authService.loadToken()})}).subscribe(
              (data: any) => {
                  data._embedded.devoirHasFileses.forEach((PHF,i)=>{
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
          this.http.get('http://localhost:8085/getDevoirFile/'+book, httpOptions).subscribe(
              (response:any) => {
                  let file = new Blob([response], { type: 'application/pdf' });
                  var fileURL = URL.createObjectURL(file);
                  window.open(fileURL);
                  },
                  error => {console.log(error);});
      }
  
      deleteBook(book: string) {
          this.http.delete('http://localhost:8085/deleteDevoirFile/'+book,
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

}
