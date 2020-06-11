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

const appRoutes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'units', component: UnitComponent, canActivate:[AuthGuard], children: [
    { path: 'addUnit', component: UnitEditComponent },
    { path: 'editUnit/:id', component: UnitEditComponent },
    { path: 'listUnit', component: UnitListComponent }
  ]}, 
  { path: 'auth', component: AuthComponent },
  { path: 'playerSettings', component: PlayerSettingsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'campaign', component: CampaignComponent },
  { path: 'army', component: ArmyComponent }
];

@NgModule({
  imports:[RouterModule.forRoot(appRoutes)],
  exports:[RouterModule]
})
export class AppRoutingModule{

}