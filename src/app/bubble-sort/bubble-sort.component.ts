import {Component} from '@angular/core';
import {AbstractSortComponent} from "../abstract-sort/abstract-sort.component";

@Component({
  selector: 'bubble-sort',
  templateUrl: './bubble-sort.component.html',
  styleUrls: ['./bubble-sort.component.less']
})
export class BubbleSortComponent extends AbstractSortComponent {
  override title = 'Bubble sort';
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

  override async sort(array: number[]) {
    this.sortIsPlaying = true;
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
        if (!await this.sleep(1000)) {
          return;
        }
      }
    }
    // Print the sorted array
    this.updateChart(array, -1);
    this.sortIsPlaying = false;
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
}
