import {Component} from '@angular/core';
import {AbstractSortComponent} from "../abstract-sort/abstract-sort.component";

@Component({
  selector: 'insertion-sort',
  templateUrl: './insertion-sort.component.html',
  styleUrls: ['./insertion-sort.component.less']
})
export class InsertionSortComponent extends AbstractSortComponent {
  override title = 'Insertion sort';
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

  override async sort(array: number[]) {
    this.sortIsPlaying = true;
    for (let i = 1; i < array.length; i++) {
      let currentValue = array[i];
      let j;
      for (j = i - 1; j >= 0 && array[j] > currentValue; j--) {
        array[j + 1] = array[j];

        this.updateChart(array, false, j + 1, i);
        if (!await this.sleep(1000)) {
          return;
        }
      }
      array[j + 1] = currentValue;

      this.updateChart(array, true,j + 1, i);
      if (!await this.sleep(1000)) {
        return;
      }
    }

    this.updateChart(array, false, 0, -1);
    this.sortIsPlaying = false;
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
}
