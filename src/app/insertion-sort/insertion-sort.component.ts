import {Component, ElementRef, ViewChild} from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'insertion-sort',
  templateUrl: './insertion-sort.component.html',
  styleUrls: ['./insertion-sort.component.less']
})
export class InsertionSortComponent {
  @ViewChild('canvas')
  private canvas!: ElementRef;
  private chart!: Chart;
  title = 'Insertion sort';
  sortCode = `
  insertionSort(array: number[]) {
    for (let i = 1; i < array.length; i++) {
      let currentValue = array[i];
      let j;
      for (j = i - 1; j >= 0 && array[j] > currentValue; j--) {
        array[j + 1] = array[j];
      }
      array[j + 1] = currentValue;
    }

    // Print the sorted array
    console.log(array);
  }
  `;

  sleep(ms: number) {
    return new Promise(r => setTimeout(r, ms));
  }

  async insertionSort(array: number[]) {
    for (let i = 1; i < array.length; i++) {
      let currentValue = array[i];
      let j;
      for (j = i - 1; j >= 0 && array[j] > currentValue; j--) {
        array[j + 1] = array[j];

        this.updateChart(array, false, j + 1, i);
        await this.sleep(1000);
      }
      array[j + 1] = currentValue;

      this.updateChart(array, true,j + 1, i);
      await this.sleep(1000);
    }

    this.updateChart(array, false, 0, -1);
  }

  updateChart(values: number[], showKeyOnly: boolean, index: number, length: number) {
    const colors = new Array(values.length).fill('lightblue');
    if (length !== -1) {
      for (let i = 0; i < length; i++) {
        colors[i] = 'lightgreen';
      }
      colors[index] = 'red';
      if (!showKeyOnly) {
        colors[index - 1] = 'green';
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

    this.insertionSort([10,3,2,7,9,1,8,6,4,5]);
  }
}
