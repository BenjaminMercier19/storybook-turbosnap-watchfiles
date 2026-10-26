import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DemoComponent } from '../component/component';

@Component({
  selector: 'app-card',
  imports: [DemoComponent],
  template: `<article class="card"><app-demo label="Card demo" /> Card body</article>`,
  styles: `.card { border: 1px solid #ccc; padding: 16px; }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {}
