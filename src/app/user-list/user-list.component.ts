import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {HttpClient} from '@angular/common/http';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {UserAddComponent} from './user-add/user-add.component';
import {UserModifyComponent} from './user-modify/user-modify.component';
import {NotificationsComponent} from '../notifications/notifications.component';
import {CrudService} from '../services/crud.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthService} from '../services/auth.service';
import {DomSanitizer} from '@angular/platform-browser';

export interface UserData {
    nom: string;
    prenom: string;
    email: string;
    username: string;
    password: string;
    photo: any;
    telehpone: string;
    role: string;
    dateCreation: number;
}

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

    displayedColumns: string[] = ['photo', 'username', 'email', 'dateCreation', 'Actions'];
    dataSource: MatTableDataSource<UserData>;
    PhotoLoading = true;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    constructor(private crudService: CrudService,
                public dialog: MatDialog,
                private _snackBar: MatSnackBar,
                private authService: AuthService,
                private domSanitizer: DomSanitizer) {
    }

    ngOnInit() {
        this.getUsers();
    }

    getUsers() {
        this.crudService.getCurrentUser().subscribe(user => {
            this.crudService.getOrganizationByUser(user).subscribe((organization:any) => {
                this.crudService.getlinkItem(organization._links.mzUsers.href).subscribe(
                    (data:any) => {

                        let listUsers: UserData[] = data._embedded.mzUsers;
                        listUsers.forEach(user => {
                            this.getPhoto(user);
                        });
                        this.dataSource = new MatTableDataSource();
                        this.dataSource = new MatTableDataSource(listUsers);
                        this.dataSource.paginator = this.paginator;
                        this.dataSource.sort = this.sort;
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
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    openAddDialog(): void {
        const dialogRef = this.dialog.open(UserAddComponent, {
            width: '500px',
            data: {}
        });

        dialogRef.afterClosed().subscribe(result => {
            setTimeout(() => {
                this.getUsers();
            }, 1000);


        });

    }

    openModifyDialog(row) {
        const dialogRef = this.dialog.open(UserModifyComponent, {
            width: '500px',
            data: {user: row}
        });

        dialogRef.afterClosed().subscribe(result => {
            setTimeout(() => {
                this.getUsers();
            }, 1000);

        });

    }

    deleteUser(row) {
        this.crudService.deleteItem(row);
        setTimeout(() => {
            this.getUsers();
        }, 1000);
        this._snackBar.open('Element Deleted', '', {
            duration: 2000,
            verticalPosition: 'top',
            panelClass: ['snackbarDelete']
        });
    }

    onFileComplete($event: string, row) {
        this.getPhoto(row);
    }

    getPhoto(user) {
        this.crudService.getProfile(user.username).subscribe(
            (response: any) => {
                let file = new Blob([response], {type: 'image/png'});
                var fileURL = this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
                console.log();
                user.photo = fileURL;
            },
            error => {
                console.log(error);
            });
    }
}
