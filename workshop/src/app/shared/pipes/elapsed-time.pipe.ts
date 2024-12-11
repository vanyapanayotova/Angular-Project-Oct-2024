import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'elapsedTime',
  standalone: true,
})
export class ElapsedTimePipe implements PipeTransform {
  transform(date: string, ...args: unknown[]): unknown {
    return moment(date).fromNow();
    return date; //TODO npm not working at the moment
  }
}
