import { Component, OnInit, Input } from '@angular/core';
import { MagicalObject } from '../magical-object.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-magical-object-item',
  templateUrl: './magical-object-item.component.html',
  styleUrls: ['./magical-object-item.component.css']
})
export class MagicalObjectItemComponent implements OnInit {


  @Input() magicalObject;

  constructor(private magicalObjectService: MagicalObject, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    
  }

  onDeleteMagicalObject(){
    this.magicalObject.deleteCampaign(this.magicalObject.id);
  }

  onEditMagicalObject(){
    this.router.navigate(['../editMagicalObject/'+this.magicalObject.id], {relativeTo: this.route});
  }
}
