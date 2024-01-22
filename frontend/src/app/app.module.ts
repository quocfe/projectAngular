import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { declarations } from './helper/declarations';
import { imports } from './helper/imports';
import { DataService } from './services/data/data.service';
import { ExpiredTokenInterceptor } from './services/rest-api/rest-api.interceptor';
import { RestApiService } from './services/rest-api/rest-api.service';

@NgModule({
  declarations: declarations,
  imports: imports,
  providers: [
    RestApiService,
    DataService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ExpiredTokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
