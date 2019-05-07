import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, en_US, NZ_ICONS, NZ_ICON_DEFAULT_TWOTONE_COLOR } from 'ng-zorro-antd';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';
import { InboxOutline, } from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';

const icons: IconDefinition[] = [InboxOutline];
registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    EffectsModule.forRoot([AppEffects]),
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({ name: 'sterling-payments', maxAge: 25, logOnly: environment.production }),
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: NZ_ICON_DEFAULT_TWOTONE_COLOR, useValue: '#00ff00' }, // If not provided, Ant Design's official blue would be used
    { provide: NZ_ICONS, useValue: icons }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
