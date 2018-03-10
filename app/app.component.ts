import { Component } from "@angular/core";

import { registerElement } from "nativescript-angular/element-registry";
registerElement("Fab", () => require("nativescript-floatingactionbutton").Fab);

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent { }
