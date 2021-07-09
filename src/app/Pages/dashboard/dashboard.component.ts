import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WebServiceService } from 'src/app/Services/web-service.service';
import { ITunesSearchResults } from 'src/app/interfaces/itunes-search-result.interface';
import { ITunesSearchEntry } from 'src/app/interfaces/itunes-search-entry.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public showModal: boolean = false;
  public searchControl: FormControl;
  public searchKeyword: string = '';
  public results: Array<ITunesSearchEntry> = [];
  private unsubscribe: Subject<any> = new Subject<any>();

  constructor(
    private webService: WebServiceService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      const search = params.search;
      console.log(search);
      this.searchKeyword = search;
      this.iTunesSearch(search);
    });
    this.searchControl = new FormControl('', Validators.required);
  }

  clickedPhotoProject() {
    this.showModal = !this.showModal;
  }

  iTunesSearch(term: string) {
    this.webService
      .getITunesResults(term)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((res) => {
        // console.log(res);
        this.searchKeyword = term;
        this.results = res.results;
        if (this.showModal) {
          this.showModal = !this.showModal;
        }
        // localStorage.setItem('search-result', JSON.stringify(res));
      });
  }

  /**
   * Destroy component and subscriptions.
   */
  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
