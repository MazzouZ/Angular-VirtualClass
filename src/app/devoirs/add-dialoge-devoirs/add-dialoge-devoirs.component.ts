import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CrudService } from 'app/services/crud.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DevoirElement } from '../devoirs.component';
import { AuthService } from 'app/services/auth.service';
@Component({
  selector: 'app-add-dialoge-devoirs',
  templateUrl: './add-dialoge-devoirs.component.html',
  styleUrls: ['./add-dialoge-devoirs.component.css']
})
export class AddDialogeDevoirsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddDialogeDevoirsComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private crudService: CrudService, private _snackBar: MatSnackBar,
    private authService:AuthService) { }

  ngOnInit(): void {
  }
  public addDevoir() {
    this.data.dateDebut = Date.now();
    this.crudService.addLinkCoursDevoir(this.data,this.authService.currentUser().sub);
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
