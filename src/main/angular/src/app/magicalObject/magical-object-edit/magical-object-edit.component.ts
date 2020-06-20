import { Component, OnInit } from '@angular/core';
import { MagicalObjectService } from '../magical-object.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MagicalObject } from '../magical-object.model';

@Component({
  selector: 'app-magical-object-edit',
  templateUrl: './magical-object-edit.component.html',
  styleUrls: ['./magical-object-edit.component.css']
})
export class MagicalObjectEditComponent implements OnInit {

  magicalObject: MagicalObject;
  id: number;
  magicalObjectForm: FormGroup;

  constructor(private magicalObjectService: MagicalObjectService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      if(this.id != null) {
        this.magicalObjectService.fetchData().subscribe(magicalObjects => {
          console.info("fetcheando data");
          this.magicalObject = magicalObjects[this.id];
          this.initForm();
        });
      } else {
        this.initForm();
      }
    });
  }

  initForm() {
    let name;
    if(this.magicalObject != null){
      console.info("Estamos en modo edicion");
    }
    this.magicalObjectForm = new FormGroup({
      'name': new FormControl(name, Validators.required)
    });
  }

  onCancel() {
    this.magicalObjectForm.reset();
    this.router.navigate(['../../listMagicalObjects'],{relativeTo: this.route});
  }

  onSubmit() {
    const value = this.magicalObjectForm.value;
    let savedCampaign = new MagicalObject(this.id);
    this.magicalObjectService.saveMagicalObject(savedCampaign);
    this.router.navigate(['../../listMagicalObjects'],{relativeTo: this.route});
  }
}
