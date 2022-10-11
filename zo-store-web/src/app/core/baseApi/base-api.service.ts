import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class BaseApiService {
  genericError = "";

  constructor(public http: HttpClient) {
    this.genericError = `Some Error occcured, Please contact Administrator for the Errors`;
  }

  get<T>(url: string): Observable<T> {
    let response = this.http.get<Responses & T>(url);

    return Observable.create((observer: Observer) => {
      response.subscribe(
        (response) => {
          observer.next(response);
          observer.complete();
        },
        (error) => {
          observer.next(error);
        }
      );
    });
  }

  post(url: string, body: object): Observable<Responses[]> {
    let response = this.http.post<Responses>(url, body);

    return Observable.create((observer: Observer) => {
      response.subscribe(
        (res) => {
          observer.next(res);
          observer.complete();
        },
        (error) => {
          observer.next(error);
        }
      );
    });
  }

  delete(url: string): Observable<Responses[]> {
    let response = this.http.delete<Responses>(url);

    return Observable.create((observer: Observer) => {
      response.subscribe(
        (res) => {
          observer.next(res);
          observer.complete();
        },
        (error) => {
          observer.next(error)
        }
      );
    });
  }
}

class Observer {
    next: Function = function() { return };
    error: Function = function() { return };
    complete: Function = function() { return };
}

export class SingleResponse {
    public status: number = 0;
    public IsSuccess: boolean = false;
    public details: string = "";
}

export class Responses {
    public errors: SingleResponse[] = [];
    public success: SingleResponse[] = [];
}