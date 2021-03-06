'use strict'

// SystemJS configuration file, see links for more information
// https://github.com/systemjs/systemjs
// https://github.com/systemjs/systemjs/blob/master/docs/config-api.md

/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
  'angular2-google-maps': 'vendor/angular2-google-maps',
  'angular2-mdl': 'vendor/angular2-mdl',
}

/** User packages configuration. */
const packages: any = {
  'angular2-google-maps/core': {
    defaultExtension: 'js',
    main: 'index.js',
  },
  'angular2-mdl': { main: 'dist/components/index.js'},
}

////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
  // Angular specific barrels.
  '@angular/core',
  '@angular/common',
  '@angular/compiler',
  '@angular/forms',
  '@angular/http',
  '@angular/router',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',

  // Thirdparty barrels.
  'rxjs',

  // App specific barrels.
  'app',
  'app/shared',
  'app/test',
  'app/log-in',
  'app/profile',
  'app/home',
  'app/flash',
  'app/map',
  'app/map-cmp',
  'app/theft-list',
  'app/theft-info',
  'app/create-theft',
  'app/edit-theft',
  /** @cli-barrel */
]

const cliSystemConfigPackages: any = {}
barrels.forEach((barrelName: string) => {
  cliSystemConfigPackages[barrelName] = { main: 'index' }
})

/** Type declaration for ambient System. */
declare var System: any

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    '@angular': 'vendor/@angular',
    'rxjs': 'vendor/rxjs',
    'main': 'main.js',
  },
  packages: cliSystemConfigPackages,
})

// Apply the user's configuration.
System.config({ map, packages })
