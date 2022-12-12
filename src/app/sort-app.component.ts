import {AfterViewInit, Component, ElementRef, ViewEncapsulation} from '@angular/core';

import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
hljs.registerLanguage('typescript', typescript);

@Component({
  selector: 'sort-app-root',
  templateUrl: './sort-app.component.html',
  styleUrls: ['./sort-app.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class SortAppComponent implements AfterViewInit{

  constructor(private el: ElementRef) {
  }

  ngAfterViewInit() {
    this.el.nativeElement.querySelectorAll('pre').forEach((element: any) => {
      hljs.highlightElement(element);
    });
  }
}
