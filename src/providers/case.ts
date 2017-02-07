import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import $fh from 'fh-js-sdk';

/*
  Generated class for the Case provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Case {
  data: any;

  constructor(public http: Http) {
    console.log('Hello Case Provider');

    $fh.on('fhinit', function(err, cloud) {
      console.log('fh initialised with: ', cloud);
      // Initialisation is now complete, you can now make $fh.cloud request

    });



  }

  load() {
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }

    // don't have the data yet
    return new Promise((resolve, reject) => {
      // We're using Angular HTTP provider to request the data,
      // then on the response, it'll map the JSON data to a parsed JS object.
      // Next, we process the data and resolve the promise with the new data.
      //  this.http
      //      .get('https://innovation.us.labs.redhatmobile.com')
      //      .map(this.extractData)
      //      .subscribe(data => {
      //        console.log('data:', data);
      //        // we've got back the raw data, now generate the core schedule data
      //        // and save the data for later reference
      //        this.data = data;
      //        resolve(this.data);
      //      });
      //});
      console.log('sending fh cloud request...');
      $fh.cloud(
          {
            "path": "/ticket/v1.0", //only the path part of the url, the host will be added automatically
            "method": "GET", //all other HTTP methods are supported as well. For example, HEAD, DELETE, OPTIONS
            "contentType": "application/json",
            //"data": { "waitTime": "12", "severity": "1"}, //data to send to the server
            "timeout": 25000 // timeout value specified in milliseconds. Default: 60000 (60s)
          },
          function (res) {
            console.log('success: ', res.tickets);
            resolve(res.tickets);
          },
          function (code) {
            console.log('failed code: ', code);
            reject(code);
          }
      );
    });
  }

  //private extractData(res: Response) {
  //  let body = res.json();
  //  return body.results || { };
  //}
  //
  //private handleError (error: Response | any) {
  //  // In a real world app, we might use a remote logging infrastructure
  //  let errMsg: string;
  //  if (error instanceof Response) {
  //    const body = error.json() || '';
  //    const err = body.error || JSON.stringify(body);
  //    errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
  //  } else {
  //    errMsg = error.message ? error.message : error.toString();
  //  }
  //  console.error(errMsg);
  //  return Observable.throw(errMsg);
  //}

}
