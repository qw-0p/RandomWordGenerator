import { Component } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { filter, map, scan } from 'rxjs/operators';
interface wordMeta {
  word: string;
  className: string;
}
export const SYMBOLS =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  stream: Observable<wordMeta[]> = timer(0, 3000).pipe(
    map(() => this.randomWordGenerate()),
    filter(str => this.zeroChecker(str)),
    map(str => {
      let className = 'default';
      if (this.palindromeChecker(str)) {
        className = 'palindrome';
      } else if (this.numberChecker(str)) {
        className = 'onlyNumbers';
      }
      return { word: str, className };
    }),
    scan((acc, curr) => {
      acc.push(curr);
      return acc;
    }, [] as any)
  );

  private randomWordGenerate(): string {
    let str = '';
    for (let i = 0; i < 5; i++) {
      str += SYMBOLS.charAt(Math.floor(Math.random() * SYMBOLS.length));
    }
    return str;
  }
  private palindromeChecker(str: string): boolean {
    const strArr = str.toLowerCase().split('');
    const newStr = strArr.join('');
    const reverse = strArr.reverse().join('');
    return newStr === reverse;
  }
  private numberChecker(str: string): boolean {
    return /^\d+$/.test(str);
  }
  private zeroChecker(str: string): boolean {
    return !/0/.test(str);
  }
}
