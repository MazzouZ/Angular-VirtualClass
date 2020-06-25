import { Component, OnInit } from '@angular/core';
import { CrudService } from 'app/services/crud.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditDialogeCoursComponent } from '../edit-dialog-cours/edit-dialoge-cours/edit-dialoge-cours.component';
import { AddDialogeCoursComponent } from '../add-dialog-cours/add-dialoge-cours/add-dialoge-cours.component';
import { Router } from '@angular/router';
import { InteractionService } from 'app/services/interaction.service';
import {MatTableDataSource} from '@angular/material/table';
import {UserData} from '../../user-list/user-list.component';
import {AuthService} from '../../services/auth.service';

export interface CoursElement {
  id            : number
  label         :String;
  code          :String;
  specialite    :String;
}

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})
export class CoursComponent implements OnInit {
  listCours :CoursElement[];
  constructor(private crudService:CrudService,public dialog: MatDialog,private _snackBar: MatSnackBar,
    private route:Router,private interactionService: InteractionService,private authService:AuthService) { }

  ngOnInit(): void {
    this.getCours();
  }

  getCours() {
    this.crudService.getCurrentUser().subscribe(user => {
      this.crudService.getOrganizationByUser(user).subscribe((organization:any) => {
        this.crudService.getlinkItem(organization._links.cours.href).subscribe(
            (data:any) => {
              this.listCours = data._embedded.courses;
            }, error => {
              console.log(error);
              this.authService.logout();
            });
      }, error => {
        console.log(error);
      });
    }, error => {
      console.error(error);
    });
    /*this.crudService.getItems('courses').subscribe(
        (data) => {
          // @ts-ignore
          this.listCours = data._embedded.courses;    
        },error => {
          console.log(error);
        });*/
      }
  //---------------------------------------------------------------------
  openModifyDialog(row) {
    const dialogRef = this.dialog.open(EditDialogeCoursComponent, {
      width: '500px',
      data: {cours :row}
    });

    dialogRef.afterClosed().subscribe(result => {
      setTimeout(()=>{
        this.getCours();
      },1000);
    });
  }
//---------------------------------------------------------------------
openAddDialog(): void {
  const dialogRef = this.dialog.open(AddDialogeCoursComponent, {
    width: '500px',
    data: {}
  });
  dialogRef.afterClosed().subscribe(result => {
    setTimeout(()=>{
      this.getCours();
    },1000);
  });
}
//---------------------------------------------------------------------
deleteCours(row){
  this.crudService.deleteItem(row);
  setTimeout(()=>{
    this.getCours();
  },1000);
  this._snackBar.open('Element Deleted',"",{
    duration: 2000,
    verticalPosition: 'top',
    panelClass: ['snackbarDelete']
  });
}   

redirectPost(cours){

  this.interactionService.sendObject(cours);
  this.route.navigate(['/post']);
  }

}
