import {Component} from '@angular/core';
import {AbstractSortComponent} from "../abstract-sort/abstract-sort.component";

@Component({
  selector: 'shaker-sort',
  templateUrl: './shaker-sort.component.html',
  styleUrls: ['./shaker-sort.component.less']
})
export class ShakerSortComponent extends AbstractSortComponent {
  override title = 'Shaker (Cocktail) sort';
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

  override async sort(array: number[]) {
    this.sortIsPlaying = true;
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
        if (!await this.sleep(1000)) {
          return;
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

        this.updateChart(array, i, -1);
        if (!await this.sleep(1000)) {
          return;
        }
      }

      start++;
    }

    // Print the sorted array
    this.updateChart(array, -1, 0);
    this.sortIsPlaying = false;
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
}
