import {Component, OnInit, ElementRef, Inject} from '@angular/core';
import {ROUTES} from '../sidebar/sidebar.component';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DevoirElement} from '../../devoirs/devoirs.component';
import {CrudService} from '../../services/crud.service';
import {UserData} from '../../user-list/user-list.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    private listTitles: any[];
    location: Location;
    mobile_menu_visible: any = 0;
    private toggleButton: any;
    private sidebarVisible: boolean;
    listDevoirsIncomplet: DevoirElement[] = [];
    listUserAndDevoir = new Map();
    currentUser:UserData;
    constructor(location: Location,
                private element: ElementRef,
                private router: Router,
                private authService: AuthService,
                private crudService: CrudService,
                private http: HttpClient,
                public dialog: MatDialog,
                private domSanitizer: DomSanitizer) {
        this.location = location;
        this.sidebarVisible = false;
    }

    ngOnInit() {
        this.crudService.getCurrentUser().subscribe((value:UserData) => {
            this.getPhoto(value);
            this.currentUser=value;
        },error => {
            console.log(error);
        });
        this.getIncompleteDevoirs();
        this.getCompleteDevoirs();

        this.listTitles = ROUTES.filter(listTitle => listTitle);
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
        this.router.events.subscribe((event) => {
            this.sidebarClose();
            var $layer: any = document.getElementsByClassName('close-layer')[0];
            if ($layer) {
                $layer.remove();
                this.mobile_menu_visible = 0;
            }
        });
    }

    getIncompleteDevoirs() {
        this.listDevoirsIncomplet=[];
        this.crudService.getCurrentUser().subscribe(
            (data1: any) => {
                this.crudService.getlinkItem(data1._links.userHasDevoirs.href).subscribe(
                    (data: any) => {
                        data._embedded.userHasDevoirs.forEach((UHD, i) => {
                            this.http.get(UHD._links.devoir.href,
                                {headers: new HttpHeaders({'Authorization': this.authService.loadToken()})}).subscribe(
                                (devoir: DevoirElement) => {
                                    if (UHD.etat === false) {
                                        this.listDevoirsIncomplet.push(devoir);
                                    }
                                }
                                , error => {
                                    console.log(error);
                                });
                        });
                    }, error => {
                        console.log(error);
                    });
            }, error => {
                console.log(error);
            });
    }
    getEntries() {
        return Array.from(this.listUserAndDevoir.entries());
    }
    getCompleteDevoirs() {
        this.listUserAndDevoir.clear();
        this.listUserAndDevoir = new Map();
        this.crudService.getItems('userHasDevoirs').subscribe(
            (data: any) => {
                data._embedded.userHasDevoirs.forEach((UHD, i) => {
                    this.http.get(UHD._links.mzUser.href,
                        {headers: new HttpHeaders({'Authorization': this.authService.loadToken()})}).subscribe(
                        (user: UserData) => {
                            if (UHD.etat === true && UHD.note ===0) {
                                this.http.get(UHD._links.devoir.href,
                                    {headers: new HttpHeaders({'Authorization': this.authService.loadToken()})}).subscribe(
                                    (devoir: DevoirElement) => {
                                        this.listUserAndDevoir.set(user, devoir);
                                    }
                                    , error => {
                                        console.log(error);
                                    });
                            }
                        }
                        , error => {
                            console.log(error);
                        });
                });
            }, error => {
                console.log(error);
            });
    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function () {
            toggleButton.classList.add('toggled');
        }, 500);

        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };

    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };
    getMapSize(x) {
        var len = 0;
        for (var count in x) {
            len++;
        }

        return len;
    }
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        var $toggle = document.getElementsByClassName('navbar-toggler')[0];

        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
        const body = document.getElementsByTagName('body')[0];

        if (this.mobile_menu_visible == 1) {
            // $('html').removeClass('nav-open');
            body.classList.remove('nav-open');
            if ($layer) {
                $layer.remove();
            }
            setTimeout(function () {
                $toggle.classList.remove('toggled');
            }, 400);

            this.mobile_menu_visible = 0;
        } else {
            setTimeout(function () {
                $toggle.classList.add('toggled');
            }, 430);

            var $layer = document.createElement('div');
            $layer.setAttribute('class', 'close-layer');


            if (body.querySelectorAll('.main-panel')) {
                document.getElementsByClassName('main-panel')[0].appendChild($layer);
            } else if (body.classList.contains('off-canvas-sidebar')) {
                document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
            }

            setTimeout(function () {
                $layer.classList.add('visible');
            }, 100);

            $layer.onclick = function () { //asign a function
                body.classList.remove('nav-open');
                this.mobile_menu_visible = 0;
                $layer.classList.remove('visible');
                setTimeout(function () {
                    $layer.remove();
                    $toggle.classList.remove('toggled');
                }, 400);
            }.bind(this);

            body.classList.add('nav-open');
            this.mobile_menu_visible = 1;

        }
    };
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

    dateDifference(startDate, endDate) {
        let currentDate = new Date(endDate);
        let dateSent = new Date(startDate);
        return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate())) / (1000 * 60 * 60 * 24));
    }

    getTitle() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee.charAt(0) === '#') {
            titlee = titlee.slice(1);
        }

        for (var item = 0; item < this.listTitles.length; item++) {
            if (this.listTitles[item].path === titlee) {
                return this.listTitles[item].title;
            }
        }
        return 'Dashboard';
    }

    addNote(user: any, devoir: any) {
        this.openDialog(user, devoir);
    }

    openDialog(userx,devoirx): void {
        const dialogRef = this.dialog.open(NoteDialog, {
            width: '250px',
            data: {user: userx,devoir: devoirx,note: 0}
        });

        dialogRef.afterClosed().subscribe(result => {
            this.crudService.addItem("AssigneNoteToUser/"+result.user.username+"/"+result.note,result.devoir);
            setTimeout(()=>{
                this.getCompleteDevoirs();
            },2000);
        });

    }

}

@Component({
    selector: 'NoteDialog',
    templateUrl: 'NoteDialog.html',
})
export class NoteDialog implements OnInit{

    constructor(
        public dialogRef: MatDialogRef<NoteDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private http: HttpClient,
        private authService:AuthService) {}
    fileName: string;
    onNoClick(): void {
        this.dialogRef.close();
    }
    getDevoir(){
        this.http.get(this.data.devoir._links.devoirHasFiles.href,
            {headers:new HttpHeaders({'Authorization':this.authService.loadToken()})}).subscribe(
            (data: any) => {
                data._embedded.devoirHasFileses.forEach((PHF,i)=>{
                    this.http.get(PHF._links.fichier.href,
                        {headers:new HttpHeaders({'Authorization':this.authService.loadToken()})}).subscribe(
                        (data2: any) => {
                            this.fileName=data2.nom;
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

    ngOnInit(): void {
        this.getDevoir();
    }

    openFile(fileName: string) {
        const httpOptions = {
            // 'responseType'  : 'arraybuffer' as 'json'
            'responseType'  : 'blob' as 'json'        //This also worked
        };
        this.http.get('http://localhost:8085/getDevoirFile/'+fileName, httpOptions).subscribe(
            (response:any) => {
                let file = new Blob([response], { type: 'application/pdf' });
                var fileURL = URL.createObjectURL(file);
                window.open(fileURL);
            },
            error => {console.log(error);});
    }
}

