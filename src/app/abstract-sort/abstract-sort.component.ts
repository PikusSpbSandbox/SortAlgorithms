import {Component, ElementRef, ViewChild} from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'abstract-sort',
  template: '',
})
export class AbstractSortComponent {
  @ViewChild('canvas') protected canvas!: ElementRef;
  protected title = '';
  protected chart!: Chart;
  protected sortIsStopping = false;
  protected sortIsPlaying = false;

  sleep(ms: number): Promise<boolean> {
    return new Promise((resolve) => {
      if (this.sortIsStopping) {
        this.sortIsStopping = false;
        resolve(false);
      } else {
        setTimeout(() => resolve(true), ms)
      }
    });
  }

  async sort(array: number[]) {
  }

  ngAfterViewInit() {
    Chart.defaults.font.size = 15;
    Chart.defaults.font.family = 'Verdana';
    Chart.defaults.responsive = true;
    Chart.defaults.maintainAspectRatio = false;

    this.chart = new Chart(this.canvas.nativeElement, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [
          {
            label: this.title,
            data: []
          }
        ]
      },
    });

    this.sort([10,3,2,7,9,1,8,6,4,5]);
  }

  onReplayClick() {
    if (this.sortIsPlaying) {
      this.sortIsStopping = true;
      const interval = setInterval(() => {
        if (!this.sortIsStopping) {
          this.sort([10, 3, 2, 7, 9, 1, 8, 6, 4, 5]);
          clearInterval(interval);
        }
      }, 100);
    } else {
      this.sort([10, 3, 2, 7, 9, 1, 8, 6, 4, 5]);
    }
  }
}
