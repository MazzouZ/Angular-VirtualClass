import {Component, OnInit, ViewChild} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog} from '@angular/material/dialog';
import { EditDialogOrganisationComponent } from 'app/organisations/edit-dialog-organisation/edit-dialog-organisation.component';
import { AddDialogOrganisationComponent } from 'app/organisations/add-dialog-organisation/add-dialog-organisation.component';
import { CrudService } from 'app/services/crud.service';
import {NotificationsComponent} from '../notifications/notifications.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthService} from '../services/auth.service';
import {UserData} from '../user-list/user-list.component';
import {DomSanitizer} from '@angular/platform-browser';

export interface OrganisationElement {
  label: String;
  id: number;
  compteOrganisation: String;
  email: String;
  photo : String;
}

@Component({
  selector: 'organisations',
  templateUrl: './organisations.component.html',
  styleUrls: ['./organisations.component.css']
})
export class OrganisationsComponent implements OnInit {
  displayedColumns: string[] = ['photo', 'label', 'compteOrganisation', 'email','Actions'];
  dataSource=new MatTableDataSource<OrganisationElement>();
  


  constructor(private crudService:CrudService,
              public dialog: MatDialog,
              private _snackBar: MatSnackBar,
              private authService: AuthService,
              private domSanitizer: DomSanitizer){}

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
        this.getOrg();
  }
  getOrg() {
    {
      this.crudService.getCurrentUser().subscribe(user => {
        this.crudService.getOrganizationByUser(user).subscribe(
            (organisation) => {
              var data: any[] = [organisation];
              let listOrg:OrganisationElement[]=data;
              listOrg.forEach(org => {
                this.getPhoto(org);
              });
              this.dataSource=new MatTableDataSource();
              this.dataSource = new MatTableDataSource(listOrg);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            },error => {
              console.log(error);
              this.authService.logout();
            });
      }, error => {
        console.error(error);
      });
    }
   /* this.crudService.getItems('organisations').subscribe(
        (data) => {
          // @ts-ignore
          let listOrg:OrganisationElement[]=data._embedded.organisations;
          this.dataSource=new MatTableDataSource();
          this.dataSource = new MatTableDataSource(listOrg);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },error => {
          console.log(error);
          this.authService.logout();
        });*/
  }
  //---------------------------------------------------------------------
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  //---------------------------------------------------------------------
    openModifyDialog(row) {
      const dialogRef = this.dialog.open(EditDialogOrganisationComponent, {
        width: '500px',
        data: {organisation :row}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        setTimeout(()=>{
          this.getOrg();
        },1000);
      });
    }
  //---------------------------------------------------------------------
  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddDialogOrganisationComponent, {
      width: '500px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      setTimeout(()=>{
        this.getOrg();
      },1000);
    });
}
  //---------------------------------------------------------------------
  deleteOrg(row){
    this.crudService.deleteItem(row);
    setTimeout(()=>{
      this.getOrg();
    },1000);
    this._snackBar.open('Element Deleted',"",{
      duration: 2000,
      verticalPosition: 'top',
      panelClass: ['snackbarDelete']
    });
  }

  onFileComplete($event: string, row) {
    this.getPhoto(row);
  }

  getPhoto(org) {
    this.crudService.getOrganisationPhoto(org.id).subscribe(
        (response: any) => {
          let file = new Blob([response], {type: 'image/png'});
          var fileURL = this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
          console.log();
          org.photo = fileURL;
        },
        error => {
          console.log(error);
        });
  }
}

  


