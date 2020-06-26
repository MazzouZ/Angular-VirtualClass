import { Component, OnInit, Inject } from '@angular/core';
import { PostElement } from 'app/Post/post/post.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CrudService } from 'app/Services/crud.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CoursElement } from 'app/Cours/cours/cours.component';
import { AuthService } from 'app/services/auth.service';

@Component({
    selector: 'app-add-dialog-post',
    templateUrl: './add-dialog-post.component.html',
    styleUrls: ['./add-dialog-post.component.css']
})
export class AddDialogPostComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<AddDialogPostComponent>,
                @Inject(MAT_DIALOG_DATA) public data,
                private crudService: CrudService, private _snackBar: MatSnackBar,
                private authService:AuthService) {
    }

    ngOnInit(): void {
        console.log(this.data.courId);
    }

    public addPost() {
        this.data.dateDebut = Date.now();
        this.crudService.addLinkItemPost(this.data,this.authService.currentUser().sub,this.data.courId);
        setTimeout(() => {
            console.log(this.crudService.resultdata);
            this._snackBar.open('Element Created', '', {
                duration: 2000,
                verticalPosition: 'top',
                panelClass: ['snackbarSuccess']
            });
        },2000)
    }
    submit() {

    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
