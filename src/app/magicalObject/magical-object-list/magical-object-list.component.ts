import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-magical-object-list',
  templateUrl: './magical-object-list.component.html',
  styleUrls: ['./magical-object-list.component.css']
})
export class MagicalObjectListComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  onCreateMagicalObject(){
    this.router.navigate(['../addMagicalObject'],{relativeTo: this.route});
  }
}
