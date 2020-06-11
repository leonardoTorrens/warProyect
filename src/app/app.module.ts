import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { WarningAlertComponent } from './warning-alert/warning-alert.component';
import { SuccessAlertComponent } from './success-alert/success-alert.component';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { StoreModule } from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import { CampaignComponent } from './campaign/campaign.component';
import { UnitComponent } from './unit/unit.component';
import { ArmyComponent } from './army/army.component';
import { UnitEditComponent } from './unit/unit-edit/unit-edit.component';
import { UnitListComponent } from './unit/unit-list/unit-list.component';
import { UnitItemComponent } from './unit/unit-item/unit-item.component';
import { PlayerSettingsComponent } from './player-settings/player-settings.component';
import { HomeComponent } from './home/home.component';
import { ArmyEditComponent } from './army/army-edit/army-edit.component';
import { ArmyItemComponent } from './army/army-item/army-item.component';
import { ArmyAddUnitComponent } from './army/army-add-unit/army-add-unit.component';
import { ArmyListComponent } from './army/army-list/army-list.component';
import { CampaignListComponent } from './campaign/campaign-list/campaign-list.component';
import { CampaignEditComponent } from './campaign/campaign-edit/campaign-edit.component';
import { CampaignItemComponent } from './campaign/campaign-item/campaign-item.component';

@NgModule({
  declarations: [
    AppComponent,
    WarningAlertComponent,
    SuccessAlertComponent,
    HeaderComponent,
    DropdownDirective,
    AuthComponent,
    LoadingSpinnerComponent,
    CampaignComponent,
    UnitEditComponent,
    UnitComponent,
    ArmyComponent,
    UnitListComponent,
    UnitItemComponent,
    PlayerSettingsComponent,
    HomeComponent,
    ArmyEditComponent,
    ArmyItemComponent,
    ArmyAddUnitComponent,
    ArmyListComponent,
    CampaignListComponent,
    CampaignEditComponent,
    CampaignItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(fromApp.appReducer)
  ],
  providers: [  
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
