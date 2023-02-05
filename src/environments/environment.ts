// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  "app" : {
    "version" : "3.0.0",
    "Description": "Main tab data information feed"
  },
  "db" : {
    "neighbor_role" : "60c642849f93ea09e4bbe3c6",
    // status 1 = Active; 2 = Inactive, 3 = New register
    "register_status" : 3,
    "server_url" : "http://ec2-52-55-153-194.compute-1.amazonaws.com/"
    // "server_url" : "http://192.168.1.109:5000/"
  }
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
