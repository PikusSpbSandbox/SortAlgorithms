import {Component} from '@angular/core';
import {AbstractSortComponent} from "../abstract-sort/abstract-sort.component";

const COLORS = {
  0: 'orange',
  1: 'purple',
  2: 'lightblue',
  3: 'grey',
  4: 'pink'
} as { [num: number]: string; }

@Component({
  selector: 'shell-sort',
  templateUrl: './shell-sort.component.html',
  styleUrls: ['./shell-sort.component.less']
})
export class ShellSortComponent extends AbstractSortComponent {
  override title = 'Shell sort';
  sortCode = `
  shellSort(array: number[]) {
    let n = array.length;

    // Start with a really large gap, and then
    // reduce the gap until there isn't any
    // With this, the gap starts as half of the array length,
    // and then half of that every time
    for (let gap = Math.floor(n/2); gap > 0; gap = Math.floor(gap/2))
    {
      // Do an insertion sort for each of the section
      for (let i = gap; i < n; i ++)
      {
        //We store the current varible
        let temp = array[i];

        //This is the insertion sort to sort the section into order
        let j;
        for (j = i; j >= gap && array[j - gap] > temp; j -= gap) {
          array[j] = array[j - gap];
        }
        array[j] = temp;
      }
    }
  `;

  override async sort(array: number[]) {
    this.sortIsPlaying = true;
    let n = array.length;

    //Start with a really large gap, and then reduce the gap until there isn't any
    //With this, the gap starts as half of the array length, and then half of that every time
    for (let gap = Math.floor(n/2); gap > 0; gap = Math.floor(gap/2))
    {
      if (!await this.sleep(0)) {
        return;
      }
      const colors = new Array(n);
      for (let colorIndexOffset = 0; colorIndexOffset < gap; colorIndexOffset++) {
        for (let colorIndex = 0; colorIndex < n; colorIndex += gap) {
          colors[colorIndex + colorIndexOffset] = COLORS[colorIndexOffset];
        }
      }

      //Do an insertion sort for each of the section the gap ends up dividing
      for (let i = gap; i < n; i ++)
      {
        //We store the current varible
        let temp = array[i];

        this.updateChart(array, [...colors], i, -1);
        if (!await this.sleep(1000)) {
          return;
        }

        //This is the insertion sort to sort the section into order
        let j;
        for (j = i; j >= gap && array[j - gap] > temp; j -= gap) {
          array[j] = array[j - gap];

          this.updateChart(array, [...colors], j - gap, j);
          if (!await this.sleep(1000)) {
            return;
          }
        }

        if (array[j] != temp) {
          array[j] = temp;

          this.updateChart(array, [...colors], j, -1);
          if (!await this.sleep(1000)) {
            return;
          }
        }
      }
    }

    // Print the sorted array
    this.updateChart(array, new Array(array.length).fill('lightgreen'), -1, -1);
    this.sortIsPlaying = false;
  }

  updateChart(values: number[],
              colors: string[],
              index1: number,
              index2: number) {
    if (index1 != -1) {
      colors[index1] = 'green';
    }
    if (index2 != -1) {
      colors[index2] = 'red';
    }
    this.chart.data.datasets[0].backgroundColor = [...colors];
    this.chart.data.labels = values;
    this.chart.data.datasets[0].data = values;
    this.chart.update();
  }
}
