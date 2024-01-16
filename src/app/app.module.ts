import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from "@angular/common/http";
import { ErrorInterceptor } from "./core/interceptor/error.interceptor";
import { SharedModule } from "./shared/shared.module";
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { SpinnerComponent } from "./core/components/spinner/spinner.component";
import { LoadingInterceptor } from "./core/interceptor/loading.interceptor";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

export function httpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [AppComponent, SpinnerComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    NoopAnimationsModule,
  ],
  providers: [
    TranslateService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
