import {Component, ElementRef, ViewChild} from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'shaker-sort',
  templateUrl: './shaker-sort.component.html',
  styleUrls: ['./shaker-sort.component.less']
})
export class ShakerSortComponent {
  @ViewChild('canvas')
  private canvas!: ElementRef;
  private chart!: Chart;
  title = 'Shaker (Cocktail) sort';
  sortCode = `
  cocktailSort(array: number[]) {
    let start = 0, end = array.length, swapped = true;

    while (swapped) {
      swapped = false;
      for (let i = start; i < end - 1; i++) {
        if (array[i] > array[i + 1]) {
          let temp = array[i];
          array[i] = array[i + 1];
          array[i+1] = temp;
          swapped = true;
        }
      }

      end--;
      if (!swapped)
        break;

      swapped = false;
      for (let i = end - 1; i > start; i--) {
        if (array[i - 1] > array[i]) {
          let temp = array[i];
          array[i] = array[i - 1];
          array[i - 1] = temp;
          swapped = true;
        }
      }

      start++;
    }

    // Print the sorted array
    console.log(array);
  }
  `;

  sleep(ms: number) {
    return new Promise(r => setTimeout(r, ms));
  }

  async cocktailSort(array: number[]) {
    let start = 0, end = array.length, swapped = true;

    while (swapped) {
      swapped = false;
      for (let i = start; i < end - 1; i++) {
        if (array[i] > array[i + 1]) {
          let temp = array[i];
          array[i] = array[i + 1];
          array[i+1] = temp;
          swapped = true;
        }

        this.updateChart(array, i, 1);
        await this.sleep(1000);
      }

      end--;
      if (!swapped)
        break;

      swapped = false;
      for (let i = end - 1; i > start; i--) {
        if (array[i - 1] > array[i]) {
          let temp = array[i];
          array[i] = array[i - 1];
          array[i - 1] = temp;
          swapped = true;
        }

        this.updateChart(array, i, -1);
        await this.sleep(1000);
      }

      start++;
    }

    // Print the sorted array
    this.updateChart(array, -1, 0);
  }

  updateChart(values: number[], currentIndex: number, increment: number) {
    const colors = new Array(values.length).fill('lightblue');
    if (currentIndex !== -1) {
      colors[currentIndex] = 'red';
      if (currentIndex + increment >= 0 && currentIndex < values.length + increment) {
        colors[currentIndex + increment] = 'green';
      }
    } else {
      colors.fill('lightgreen');
    }
    this.chart.data.datasets[0].backgroundColor = colors;
    this.chart.data.labels = values;
    this.chart.data.datasets[0].data = values;
    this.chart.update();
  }

  async ngAfterViewInit() {
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

    this.cocktailSort([10,3,2,7,9,1,8,6,4,5]);
  }
}
