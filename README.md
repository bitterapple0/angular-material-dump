# MaterialTheme

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# Implementing Themes (so far)
## Introduction
We lazy load the theme to prevent bloating the styles file and the material themes can be applied throughout.

**General Idea:** Everytime we load a new css file as the main styles file, we are appling a new `<link rel="stylesheet" href="theme-name.css" >` in the **index.html** file(function that does this discussed below)

**Scss files logic**: 
1. Main style file is lazy loaded
2. Style file has 2 scss classes, `color-theme` and `color-theme-dark`
3. These classes are build via @mixins which we include using @include.
4. The mixins we include take in the color variables we define in the main style file, as arguements. 
5. Mixins are defined in separate scss files to keep code neat, but must import them to the styles file to @include.
6. For mixins that **depend on** the theme being set, arguement must be defined as `angular-dark-theme` or `angular-light-theme`. Then you must extract the necessary colors and assign them as variables using `map-get` eg:
```scss
@mixin new-custom-theme($theme) {
    $primary: map-get($theme, primary);
    $accent: map-get($theme, accent);
    $warn: map-get($theme, warn);
    $foreground: map-get($theme, foreground);
    $background: map-get($theme, background); 

```  

## Adding a New theme

1. Create a css file and apply the template
    - Variables are denoted by $ and the 3 main colors you need to deal with are primay, accent, and warn to create a `mat-light-theme / mat-dark-theme` variable
    - Only 2 classes, the dark and a light class per css file to prevent bloating
    - Notification theme is used for styling the snackbars
    - `@include angular-material-theme` is used for the base styling of all angular material elements
    - `@include global-class-theme` is a @mixin of classes based on the current theme color to be applied to elements
    - `@include notification-theme` is a @mixin for styling of the snackbars despatched from the notification.service  
```scss
@import '~@angular/material/theming';
@import './themes/global-class-theme.scss';
@import './themes/notification-theme.scss';

@include mat-core();
//Main theme
$primary-blue-theme: mat-palette($mat-blue, 600);
$accent-blue-theme: mat-palette($mat-amber, 600);
$warn-blue-theme: mat-palette($mat-grey, 300);

$blue-theme:mat-light-theme($primary-blue-theme,$accent-blue-theme,$warn-blue-theme);
$blue-dark-theme:mat-dark-theme($primary-blue-theme,$accent-blue-theme,$warn-blue-theme);
//Notification theme
$info: mat-palette($mat-blue);
$success: mat-palette($mat-green);
$warning: mat-palette($mat-yellow);
$error: mat-palette($mat-red);


.color-theme{
    @include angular-material-theme($blue-theme);
    @include global-class-theme($blue-theme);
    @include notification-theme($info,$success,$warning,$error)
}
.color-theme-dark{
    @include angular-material-theme($blue-dark-theme);
    @include global-class-theme($blue-dark-theme);
    @include notification-theme($info,$success,$warning,$error)
}

html, body { height: 100%; }
body { margin: 0; font-family: Roboto, "Helvetica Neue", sans-serif; }
```
2. Go to Angular.json file and update it as follows under the "architect" key, you will see a "styles". **Run ng serve again to update these changes
    - Add "extractCss: true" so that it will load styles files as css instead of .js (check chrome dev tools network panel to see this)
    - `input` will be location of the scss file created in step 1
    - `bundlename` will be the name of css file created (will refer to this name later)
    - set `inject` to false
```json
"extractCss": true,
"styles": [
"src/styles.scss",
...,
{
  "input": "src/blue-style-lazy.scss",
  "bundleName": "blue-style",
  "inject":false
},
```

## Switching Themes
Each time we switch themes, we will lazy load the file into the index.html via a link tag. This method allows us to apply the `loadStyle()` function on **any component**, we just need to inject the DOCUMENT token via import.  
*will test if making a service works*

What happens in `loadStyle()`
- We first get the `<head>` element tag which should only exist in the index.html
- The if statement checks if there exists a specific link tag with id:'apply-theme-here', else it will create a new link element and apply the styleName argument as the href value. 
- If link tag already exists, it will simply replace href value.
- This link is then appended as a child element of the `<head>` element. This css file will become the new global style.
```typescript
import { DOCUMENT } from '@angular/common';
...
export class SidenavComponent implements OnInit {
  constructor(
    @Inject(DOCUMENT) private document: Document) { }
...

  //Css Loader
  loadStyle(styleName: string){
    const head = this.document.getElementsByTagName('head')[0];

    let themeLink = this.document.getElementById(
      'apply-theme-here'
    ) as HTMLLinkElement;

    if (themeLink) {
      themeLink.href = styleName 
    } else {
      const style = this.document.createElement('link');
      style.id = 'apply-theme-here';
      style.rel = 'stylesheet';
      style.href = `${styleName}`;

      head.appendChild(style)
    }
```

## Toggle Dark Mode 
Within each theme scss, recall there is `color-theme`(light) and `color-theme-dark` class we can toggle between. We do so using a service. This class **must** be applied on the selector tag of the conatiner component (eg a sidenavbar, all content will be routed to the `<mat-sidenav-content>` tag and will inherit the class applied to the **sidenav component selector tag**, not `<mat-sidenav-container` tag)

#### The Service
- By default, the theme is always in light mode as subject is set as "color-theme" class
- `getColorClass()` is used to return class as observable
- `setOverlay()` function is necessary to set the theme for the overlay containers (things that overlap the screen) such as menu and snackbars. 
  *Initial setting of overlay class when the app loads is done in constructor of the service*
- `switchDarkClass()` will set the overlay and observable to the next class depending on the current class set. 
```typescript
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OverlayContainer } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root'
})
export class ColorPickerService {
  subject: BehaviorSubject<string> = new BehaviorSubject('color-theme')
  colorClass$: Observable<string> = this.subject.asObservable()
  constructor(private overlayContainer:OverlayContainer) { 
    overlayContainer.getContainerElement().classList.remove('cdk-overlay-container')
    overlayContainer.getContainerElement().classList.add('color-theme');
  }
  
  getColorClass(){
    return this.colorClass$
  }

  switchDarkClass(isDark:boolean){
    if(isDark){
      this.setOverlay('color-theme-dark')
      this.subject.next('color-theme-dark')
    }
    else{
      this.setOverlay('color-theme')
      this.subject.next('color-theme')
    }
  }
   setOverlay(className:string){
    let currentTheme =this.overlayContainer.getContainerElement().classList[0]
    this.overlayContainer.getContainerElement().classList.remove(currentTheme)
    this.overlayContainer.getContainerElement().classList.add(className)
  }
}
```
## Apply defined Classes

Now if you want to apply classes to html elements, we have set classes that follow the color scheme of the current theme that is set. They can all be found in global-class-theme.scss file. All you need to do is set the class of your html element to one of them.  

- `primary-theme`,`accent-theme`,`warn-theme` sets the background color based on the primary/accent/warn theme.
- Can defined more classes as we see fit. eg ligher colored ones, darker colored ones etc. 

```scss
@mixin global-class-theme($theme) {
    $primary: map-get($theme, primary);
    $accent: map-get($theme, accent);
    $warn: map-get($theme, warn);
    $foreground: map-get($theme, foreground);
    $background: map-get($theme, background); 

    .basic-theme{
      color: mat-color($foreground, text);
      background-color: mat-color($background, card);
    }
    .primary-theme{
      color: mat-color($primary, default-contrast);
      background-color: mat-color($primary);
    }
    .accent-theme{
      color: mat-color($foreground, text);
      background-color: mat-color($accent);
    }
    .warn-theme{
      color: mat-color($foreground, text);
      background-color: mat-color($warn);
    }  
}
```
## Create custom global classes. 

In the main styles file, we define the primary, accent and warn files using mat-palette which is a collection of colors.

The mat-palette takes in 4 arguments:
- variable for color-palette eg. $mat-blue
- Default shade value
- Lighter shade value
- Darker shade value

Click the following to learn more:
- [Standard palettes](//https://material.io/resources/color/#!/?view.left=0&view.right=0)
- [Generate Custom Palette](http://mcg.mbitson.com/#!?mcgpalette0=%233f51b5)
- [Github File to understand the map properly](https://github.com/angular/components/blob/master/src/material/core/theming/_palette.scss)

So how do we call a specific one of these colors?
1. To the scss property, use mat-color which takes 2 arguements: 
    - Main color variable 
    - Key to specify the desired shade *(follows default shade if not passed)*
2. For primary, accent and warn color-palettes you obtained via map-get, they follow the color-palettes:
   - You can pass in the number from 50 - 900 to choose the desired shade
   - You can use lighter, darker, contrast as well.
3. Bacground and foreground are special maps, they depend on whether the them set is dark or light.       
```scss
$mat-light-theme-background: (
  status-bar: map_get($mat-grey, 300),
  app-bar:    map_get($mat-grey, 100),
  background: map_get($mat-grey, 50),
  hover:      rgba(black, 0.04), // TODO(kara): check style with Material Design UX
  card:       white,
  dialog:     white,
  disabled-button: rgba(black, 0.12),
  raised-button: white,
  focused-button: $dark-focused,
  selected-button: map_get($mat-grey, 300),
  selected-disabled-button: map_get($mat-grey, 400),
  disabled-button-toggle: map_get($mat-grey, 200),
  unselected-chip: map_get($mat-grey, 300),
  disabled-list-option: map_get($mat-grey, 200),
  tooltip: map_get($mat-grey, 700),
);

// Background palette for dark themes.
$mat-dark-theme-background: (
  status-bar: black,
  app-bar:    map_get($mat-grey, 900),
  background: #303030,
  hover:      rgba(white, 0.04), // TODO(kara): check style with Material Design UX
  card:       map_get($mat-grey, 800),
  dialog:     map_get($mat-grey, 800),
  disabled-button: rgba(white, 0.12),
  raised-button: map-get($mat-grey, 800),
  focused-button: $light-focused,
  selected-button: map_get($mat-grey, 900),
  selected-disabled-button: map_get($mat-grey, 800),
  disabled-button-toggle: black,
  unselected-chip: map_get($mat-grey, 700),
  disabled-list-option: black,
  tooltip: map_get($mat-grey, 700),
);

// Foreground palette for light themes.
$mat-light-theme-foreground: (
  base:              black,
  divider:           $dark-dividers,
  dividers:          $dark-dividers,
  disabled:          $dark-disabled-text,
  disabled-button:   rgba(black, 0.26),
  disabled-text:     $dark-disabled-text,
  elevation:         black,
  hint-text:         $dark-disabled-text,
  secondary-text:    $dark-secondary-text,
  icon:              rgba(black, 0.54),
  icons:             rgba(black, 0.54),
  text:              rgba(black, 0.87),
  slider-min:        rgba(black, 0.87),
  slider-off:        rgba(black, 0.26),
  slider-off-active: rgba(black, 0.38),
);

// Foreground palette for dark themes.
$mat-dark-theme-foreground: (
  base:              white,
  divider:           $light-dividers,
  dividers:          $light-dividers,
  disabled:          $light-disabled-text,
  disabled-button:   rgba(white, 0.3),
  disabled-text:     $light-disabled-text,
  elevation:         black,
  hint-text:         $light-disabled-text,
  secondary-text:    $light-secondary-text,
  icon:              white,
  icons:             white,
  text:              white,
  slider-min:        white,
  slider-off:        rgba(white, 0.3),
  slider-off-active: rgba(white, 0.3),
);
```

4. We always want our text to be visible. We can pass `default-contrast`,`ligher-contrast` or `darker-contrast`. **Must have defined darker and logher shade value via mat-palette in main scss file**. 
   Use `<shade_value>-contrast` in mat-color if you defined a specific shade.
   You can also use **mat-contrast** and pass in the color variable and shade value. 
```scss
color: mat-color($primary, default-contrast); // or 'lighter-contrast' or 'darker-contrast'
color: mat-contrast($primary, 900);
color: mat-color($primary, 900-contrast)
```
