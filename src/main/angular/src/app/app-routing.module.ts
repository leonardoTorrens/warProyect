import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { UnitComponent } from './unit/unit.component';
import { UnitEditComponent } from './unit/unit-edit/unit-edit.component';
import { UnitListComponent } from './unit/unit-list/unit-list.component';
import { PlayerSettingsComponent } from './player-settings/player-settings.component';
import { HomeComponent } from './home/home.component';
import { ArmyComponent } from './army/army.component';
import { CampaignComponent } from './campaign/campaign.component';
import { ArmyEditComponent } from './army/army-edit/army-edit.component';
import { ArmyListComponent } from './army/army-list/army-list.component';
import { CampaignEditComponent } from './campaign/campaign-edit/campaign-edit.component';
import { CampaignListComponent } from './campaign/campaign-list/campaign-list.component';
import { MagicalObjectListComponent } from './magicalObject/magical-object-list/magical-object-list.component';
import { MagicalObjectEditComponent } from './magicalObject/magical-object-edit/magical-object-edit.component';
import { MagicalObjectComponent } from './magicalObject/magical-object.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'playerSettings', component: PlayerSettingsComponent, canActivate:[AuthGuard] },
  { path: 'home', component: HomeComponent },
  { path: 'units', component: UnitComponent, canActivate:[AuthGuard], children: [
    { path: 'addUnit', component: UnitEditComponent },
    { path: 'editUnit/:id', component: UnitEditComponent },
    { path: 'listUnit', component: UnitListComponent }
  ]}, 
  { path: 'campaign', component: CampaignComponent, canActivate:[AuthGuard], children: [
    { path: 'addCampaign', component: CampaignEditComponent },
    { path: 'editCampaign/:id', component: CampaignEditComponent },
    { path: 'listCampaign', component: CampaignListComponent }
  ]}, 
  { path: 'army', component: ArmyComponent, canActivate:[AuthGuard], children: [
    { path: 'addArmy', component: ArmyEditComponent },
    { path: 'editArmy/:id', component: ArmyEditComponent },
    { path: 'listArmy', component: ArmyListComponent }
  ]}, 
  { path: 'magicalObject', component: MagicalObjectComponent, canActivate:[AuthGuard], children: [
    { path: 'addMagicalObject', component: MagicalObjectEditComponent },
    { path: 'editMagicalObject/:id', component: MagicalObjectEditComponent },
    { path: 'listMagicalObject', component: MagicalObjectListComponent }
  ]}, 
];

@NgModule({
  imports:[RouterModule.forRoot(appRoutes)],
  exports:[RouterModule]
})
export class AppRoutingModule{

}