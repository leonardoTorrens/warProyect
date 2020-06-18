import { Injectable } from '@angular/core';
import { SelectedUnit } from './selectedUnit.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ArmyUnitService {

  constructor(private dataStorage: DataStorageService,) { }

  ngOnInit(): void { }

  addUnit(selectedUnit: SelectedUnit) {
    
  }
}
