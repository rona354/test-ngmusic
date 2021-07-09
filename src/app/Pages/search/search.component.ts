import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WebServiceService } from 'src/app/Services/web-service.service';
import { ITunesSearchResults } from 'src/app/interfaces/itunes-search-result.interface';
import { ITunesSearchEntry } from 'src/app/interfaces/itunes-search-entry.interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  /**
   * Form group for search field
   */
  public searchControl: FormControl;
  public results: Array<ITunesSearchEntry> = [];
  public woeid: string;
  private unsubscribe: Subject<any> = new Subject<any>();

  constructor(private webService: WebServiceService, private router: Router) {}

  ngOnInit(): void {
    this.searchControl = new FormControl('', Validators.required);
  }

  iTunesSearch(term: string) {
    // this.webService
    //   .getITunesResults(term)
    //   .pipe(takeUntil(this.unsubscribe))
    //   .subscribe((res) => {
    //     console.log(res);
    //     localStorage.setItem('search-result', JSON.stringify(res));
    //     // move to page...
    //   });
    this.router.navigate(['/dashboard'], { queryParams: { search: term } });
  }

  /**
   * Destroy component and subscriptions.
   */
  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
