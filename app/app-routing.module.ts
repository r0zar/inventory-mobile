import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { AuthGuard } from "./shared/auth-guard.service";

export const AuthProviders = [AuthGuard];

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "login", loadChildren: "./login/login.module#LoginModule" },
    { path: "signup", loadChildren: "./signup/signup.module#SignupModule" },
    { path: "home", loadChildren: "./home/home.module#HomeModule", canActivate: [AuthGuard] },
    { path: "facilities", loadChildren: "./facilities/facilities.module#FacilitiesModule", canActivate: [AuthGuard] },
    { path: "plants", loadChildren: "./plants/plants.module#PlantsModule", canActivate: [AuthGuard] },
    { path: "packages", loadChildren: "./packages/packages.module#PackagesModule", canActivate: [AuthGuard] },
    { path: "transfers", loadChildren: "./transfers/transfers.module#TransfersModule", canActivate: [AuthGuard] },
    { path: "settings", loadChildren: "./settings/settings.module#SettingsModule", canActivate: [AuthGuard] },
    { path: "subscription", loadChildren: "./subscription/subscription.module#SubscriptionModule", canActivate: [AuthGuard] },
    { path: "payment", loadChildren: "./payment/payment.module#PaymentModule", canActivate: [AuthGuard] },
    { path: "credits", loadChildren: "./credits/credits.module#CreditsModule", canActivate: [AuthGuard] },
    { path: "cars", loadChildren: "./cars/cars.module#CarsModule", canActivate: [AuthGuard] }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
