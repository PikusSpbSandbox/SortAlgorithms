import {Component, ElementRef, ViewChild} from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'bubble-sort',
  templateUrl: './bubble-sort.component.html',
  styleUrls: ['./bubble-sort.component.less']
})
export class BubbleSortComponent {
  @ViewChild('canvas')
  private canvas!: ElementRef;
  private chart!: Chart;
  title = 'Bubble sort';
  sortCode = `
    bubbleSort(array: number[]) {
      for (let i = 0; i <= array.length - 1; i++) {

        // Last i elements are already in place
        for (let j = 0; j < (array.length - i - 1); j++) {

          // Comparing two adjacent numbers
          // and see if first is greater than second
          if (array[j] > array[j+1]) {

            // Swap them if the condition is true
            const temp = array[j];
            array[j] = array[j + 1];
            array[j+1] = temp;
          }
        }
      }

      // Print the sorted array
      console.log(array);
    }
  `;

  sleep(ms: number) {
    return new Promise(r => setTimeout(r, ms));
  }

  async bubbleSort(array: number[]) {
    for (let i = 0; i <= array.length-1; i++) {

      // Last i elements are already in place
      for (let j = 0; j < ( array.length - i -1); j++) {

        // Comparing two adjacent numbers
        // and see if first is greater than second
        if (array[j] > array[j+1]) {

          // Swap them if the condition is true
          const temp = array[j];
          array[j] = array[j + 1];
          array[j+1] = temp;
        }

        this.updateChart(array, j);
        await this.sleep(1000);
      }
    }
    // Print the sorted array
    this.updateChart(array, -1);
  }

  updateChart(values: number[], currentIndex: number) {
    const colors = new Array(values.length).fill('lightblue');
    if (currentIndex !== -1) {
      colors[currentIndex] = 'red';
      if (currentIndex < values.length - 1) {
        colors[currentIndex + 1] = 'green';
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

    this.bubbleSort([10,3,2,7,9,1,8,6,4,5]);
  }
}
