import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NgxInfiniteScrollService {
  onSelectOptions = new BehaviorSubject<{currentPage: number, totalPages: number, options: any[]}>({
    currentPage: 0,
    totalPages: 0,
    options: [],
  });
  onSelectOptions$ = this.onSelectOptions.asObservable();
  constructor() { }
}
