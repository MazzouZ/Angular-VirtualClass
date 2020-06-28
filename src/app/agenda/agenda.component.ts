import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import { DevoirElement, DevoirsComponent } from 'app/devoirs/devoirs.component';
import { AuthService } from 'app/services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CrudService } from 'app/services/crud.service';

export interface eventElement {
  id: number
  title: String;
  start: Date;
  end:Date;
}

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {
  listDevoirsIncomplet: DevoirElement[] = [];
  event:eventElement[]=[];
  constructor(private crudService: CrudService,private authService: AuthService, private http: HttpClient) { }

  ngOnInit(): void {
    this.getDevoirs();
    //this.test();
    //console.log(this.event); 
  }
  
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    events: [
      {
        title  : 'Annonce Exam',
        start  : '2020-07-01'
      },
      {
        title  : 'Annonce Controle',
        start  : '2020-06-22',
        end    : '2020-06-30'
      },
      {
        title  : 'Test',
        start  : '2020-07-03T12:30:00',
        allDay : false // will make the time show
      },
      
      {
        events: [this.event],
        color: 'black',     // an option!
        textColor: 'yellow' // an option!
      }
      // any other event sources...
  
    ]
    
  };
  //$('#calendar').fullCalendar( 'renderEvent', this.event);
  /*test(){
    this.event=[];
    this.listDevoirsIncomplet.forEach((element,i)=>{
        this.event[i].id=i;
        this.event[i].title=element.titre;
        this.event[i].start=element.dateDebut;
        this.event[i].end=element.dateFin;
          });
          this.event[0]={id:1 , title: 'New event', start:  new Date(), end:  new Date(2021-6-30)};     
    
  }*/


  getDevoirs() {
    this.listDevoirsIncomplet = [];
    this.crudService.getCurrentUser().subscribe(
        (data1: any) => {
            this.crudService.getlinkItem(data1._links.userHasDevoirs.href).subscribe(
                (data) => {
                    // @ts-ignore
                    data._embedded.userHasDevoirs.forEach((PHF, i) => {
                        this.http.get(PHF._links.devoir.href,
                            {headers: new HttpHeaders({'Authorization': this.authService.loadToken()})}).subscribe(
                            (data2: any) => {

                                if (PHF.etat === false) 
                                    this.listDevoirsIncomplet.push(data2);

                            
                            }, error => {
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


}
