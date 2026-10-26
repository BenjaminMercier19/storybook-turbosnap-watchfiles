import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './component.html',
  styleUrl: './component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoComponent {
  readonly label = input('Demo');
}
