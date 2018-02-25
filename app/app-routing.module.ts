import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { AuthGuard } from "./shared/auth-guard.service";

export const AuthProviders = [AuthGuard];

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "login", loadChildren: "./login/login.module#LoginModule" },
    { path: "signup", loadChildren: "./signup/signup.module#SignupModule" },
    { path: "home", loadChildren: "./home/home.module#HomeModule" },
    { path: "search", loadChildren: "./search/search.module#SearchModule" },
    { path: "settings", loadChildren: "./settings/settings.module#SettingsModule" },
    { path: "cars", loadChildren: "./cars/cars.module#CarsModule"}
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
