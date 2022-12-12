import {Component, ElementRef, ViewChild} from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'shell-sort',
  templateUrl: './shell-sort.component.html',
  styleUrls: ['./shell-sort.component.less']
})
export class ShellSortComponent {
  @ViewChild('canvas')
  private canvas!: ElementRef;
  private chart!: Chart;
  title = 'Shell sort';
  sortCode = `
  shellSort(array: number[]) {
    let n = array.length;

    // Start with a really large gap, and then
    // reduce the gap until there isn't any
    // With this, the gap starts as half of the array length,
    // and then half of that every time
    for (let gap = Math.floor(n/2); gap > 0; gap = Math.floor(gap/2))
    {
      // Do an insertion sort for each of
      // the section the gap ends up dividing
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

  sleep(ms: number) {
    return new Promise(r => setTimeout(r, ms));
  }

  async shellSort(array: number[]) {
    let n = array.length;

    //Start with a really large gap, and then reduce the gap until there isn't any
    //With this, the gap starts as half of the array length, and then half of that every time
    for (let gap = Math.floor(n/2); gap > 0; gap = Math.floor(gap/2))
    {
      //Do an insertion sort for each of the section the gap ends up dividing
      for (let i = gap; i < n; i ++)
      {
        //We store the current varible
        let temp = array[i];

        //This is the insertion sort to sort the section into order
        let j;
        for (j = i; j >= gap && array[j - gap] > temp; j -= gap) {
          array[j] = array[j - gap];

          this.updateChart(array, false, j - gap, j, gap);
          await this.sleep(1000);
        }

        array[j] = temp;

        this.updateChart(array, true, j, -1, gap);
        await this.sleep(1000);
      }
    }

    // Print the sorted array
    this.updateChart(array, false, 0, 0, -1);
  }

  updateChart(values: number[], showKeyOnly: boolean, index: number, index2: number, gap: number) {
    const colors = new Array(values.length).fill('lightblue');
    if (gap !== -1) {
      for (let i = 0; i < values.length; i += gap) {
        colors[i] = 'blue';
      }
      if (index2 != -1) {
        if (!showKeyOnly) {
          colors[index2] = 'green';
        }
      }
      colors[index] = 'red';
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

    this.shellSort([10,3,2,7,9,1,8,6,4,5]);
  }
}
