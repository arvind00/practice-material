
> https://material.angular.io/guide/getting-started

```sh
λ ng add @angular/material
i Using package manager: npm
√ Found compatible package version: @angular/material@12.1.3.
√ Package information loaded.

The package @angular/material@12.1.3 will be installed and executed.
Would you like to proceed? Yes
√ Package successfully installed.
? Choose a prebuilt theme name, or "custom" for a custom theme: Custom
? Set up global Angular Material typography styles? Yes
? Set up browser animations for Angular Material? Yes
UPDATE package.json (1145 bytes)
√ Packages installed successfully.
UPDATE src/app/app.module.ts (502 bytes)
UPDATE src/styles.scss (1693 bytes)
UPDATE src/index.html (584 bytes)
```

## Custom Theme Color Selection
- For theme color refer
> https://material.io/design/color/the-color-system.html#tools-for-picking-colors

## Create a separate module for the module import from angular material
```ts
// src/app/material.module.ts
import { NgModule } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    exports: [
        MatButtonModule
    ]
})
export class MaterialModule { }
```

```ts
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Test the Button Component

```html
<!--app.component.html -->
<div class="example-button-row">
    <button mat-raised-button class="mr-2">Basic</button>
    <button mat-raised-button color="primary">Primary</button>
    <button mat-raised-button color="accent">Accent</button>
    <button mat-raised-button color="warn">Warn</button>
    <button mat-raised-button disabled>Disabled</button>
    <a mat-raised-button routerLink=".">Link</a>
</div>
```
