import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  Validators,
} from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { NgxInfiniteScrollService } from './ngx-infinite-scroll.service';

@Component({
  selector: 'ngx-infinite-scroll',
  templateUrl: 'ngx-infinite-scroll.component.html',
  styleUrls: ['ngx-infinite-scroll.component.scss']
})
export class NgxInfiniteScrollComponent implements OnInit, AfterViewInit, OnDestroy {

  options: any[] = [];
  @Input() isObject: boolean = false;
  @Input() key: string = '';
  @ViewChild('select', { static: true }) selectElem: any;
  @Output() selectedOptions = new EventEmitter();
  @Input() multiple = true;
  @Input() nextBatch: ((page: number) => void) | undefined;
  @Input() id: any;
  @Input() label!: string;
  @Input() labelStyles: any;
  @Input() matSelectStyles: any;
  @Input() matFormFieldStyles: any;
  @Input() initialpage = 0;
  currentPage: number | undefined;
  totalPages: number | undefined;
  nextPage: number | undefined;
  selectObs: Subscription | undefined;
  control = new FormControl(null, {
    validators: Validators.required,
  });
  private readonly PIXEL_TOLERANCE = 3.0;

  constructor(private ngxInfiniteScrollService: NgxInfiniteScrollService) {}

  ngOnInit(): void {
    // @ts-ignore
    this.nextBatch(this.initialpage);
    this.control.valueChanges
      .pipe(debounceTime(500))
      .subscribe((selectedOptions) =>
        this.selectedOptions.next({ selectedOptions, control: this.control }),
      );
    this.selectObs = this.ngxInfiniteScrollService.onSelectOptions$.subscribe((config: any) => {
      this.updateConfig(config);
    });
  }

  ngAfterViewInit(): void {
    this.selectElem?.openedChange?.subscribe(
      (event: boolean) => event && this.registerPanelScrollEvent(),
    );
  }

  private registerPanelScrollEvent() {
    const panel = this.selectElem?.panel?.nativeElement;
    panel.addEventListener('scroll', (event: any) =>
      this.loadNextOnScroll(event),
    );
  }  // @ts-ignore

  private loadNextOnScroll(event: any) {
    if (
      this.hasScrolledToBottom(event.target) &&
      // @ts-ignore  // @ts-ignore
      this.currentPage <= this.totalPages - 1
    ) {
      // @ts-ignore
      this.nextBatch(this.nextPage);
    }
  }

  private hasScrolledToBottom(target: any): boolean {
    return (
      Math.abs(
        target.scrollHeight - target.scrollTop - target.clientHeight,
      ) < this.PIXEL_TOLERANCE  // @ts-ignore
    );
  }

  private updateConfig = (config: any) => {
    this.currentPage = config.currentPage;
    this.totalPages = config.totalPages;
    // @ts-ignore
    this.nextPage = this.currentPage + 1;
    const options = [...this.options, ...config.options];
    if(this.isObject) {
      this.options = [
        ...new Map(options.map((option) => [option.id, option])).values(),
      ];
    } else {
      this.options = [
        ...new Set(options)
      ];
    }
  };

  ngOnDestroy(): void {
    this.selectObs?.unsubscribe();
  }
}
