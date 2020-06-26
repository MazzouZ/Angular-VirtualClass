import { Component, OnInit } from '@angular/core';
import { CrudService } from 'app/services/crud.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AddDialogeDevoirsComponent } from './add-dialoge-devoirs/add-dialoge-devoirs.component';
import { OnClickDialogeDevoirsComponent } from './on-click-dialoge-devoirs/on-click-dialoge-devoirs.component';
import { EditDialogeDevoirsComponent } from './edit-dialoge-devoirs/edit-dialoge-devoirs.component';
import { CompileTemplateMetadata } from '@angular/compiler';
import { SharingService } from 'app/services/sharing.service';
import { AuthService } from 'app/services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


export interface DevoirElement {
  id            : number
  titre         :String;
  description   :String;
  dateDebut     :number;
  dateFin       :number;
  regles          :String;
  etat        :boolean;
}

@Component({
  selector: 'app-devoirs',
  templateUrl: './devoirs.component.html',
  styleUrls: ['./devoirs.component.css']
})
export class DevoirsComponent implements OnInit {
  listHasDevoirs :any[]=[];
  listDevoirsComplet :DevoirElement[]=[];
  listDevoirsIncomplet :DevoirElement[]=[];
  sub : Subscription;
  nbrComplet:number=0;
  nbrNonComplet:number=0;
  constructor(private crudService:CrudService,public dialog: MatDialog,private _snackBar: MatSnackBar,
    private route:ActivatedRoute,private interactionService:SharingService,
    private authService:AuthService,private http:HttpClient) { }

    ngOnInit(): void {
      this.listDevoirsComplet=[];
      this.listDevoirsIncomplet=[]; 
      
        this.getDevoirs();
      
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
                      console.log(PHF.etat);
                         if(PHF.etat===true)
                              this.listDevoirsComplet[i]=data2;
                         else
                              this.listDevoirsIncomplet[i]=data2;
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
      const dialogRef = this.dialog.open(OnClickDialogeDevoirsComponent, {
        width: '500px',
        data: {devoir :row},
        panelClass: 'myapp-no-padding-dialog'
      });
  
      dialogRef.afterClosed().subscribe(result => {
        setTimeout(()=>{
          this.getDevoirs();
        },1000);
      });
    }   
  //---------------------------------------------------------------------
  
  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddDialogeDevoirsComponent, {
      width: '500px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      setTimeout(()=>{
        this.getDevoirs();
      },1000);
    });
  }
  //---------------------------------------------------------------------
    openModifyDialog(row) {
      const dialogRef = this.dialog.open(EditDialogeDevoirsComponent, {
        width: '500px',
        data: {devoir: row}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        setTimeout(() => {
          this.getDevoirs();
        }, 1000);
      });
    }
  
    //---------------------------------------------------------------------
    deleteDevoir(row) {
      this.crudService.deleteItem(row);
      setTimeout(() => {
        this.getDevoirs();
      }, 1000);
      this._snackBar.open('Element Deleted', '', {
        duration: 2000,
        verticalPosition: 'top',
        panelClass: ['snackbarDelete']
      });
    }

}
