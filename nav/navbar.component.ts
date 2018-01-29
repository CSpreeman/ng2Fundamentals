import { Component } from '@angular/core'
import { AuthService } from '../user/auth.service'
import { ISession } from '../events/shared/event.model'
import { EventService, IEvent } from '../events/index'
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'nav-bar',
  templateUrl: 'app/nav/navbar.component.html',
  styles: [`
    .nav.navbar-nav {font-size:15px} 
    #searchForm {margin-right:100px; } 
    @media (max-width: 1200px) {#searchForm {display:none}}
    li > a.active { color: #F97924; }
  `],

})
export class NavBarComponent implements OnInit {
  searchTerm: string = "";
  foundSessions: ISession[];
  events: IEvent[];

  constructor(private auth: AuthService, private eventService: EventService) {
  }

  ngOnInit() {
  this.eventService.getEvents().subscribe(results => {
      this.events = results
    })
  }

  searchSessions(searchTerm) {
    this.eventService.searchSessions(searchTerm).subscribe(sessions => {
      this.foundSessions = sessions;
    })
  }
}
