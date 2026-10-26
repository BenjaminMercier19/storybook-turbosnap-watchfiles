import type { Meta, StoryObj } from '@storybook/angular-vite';
import { DemoComponent } from './component';

const meta: Meta<DemoComponent> = { title: 'Demo', component: DemoComponent };
export default meta;

export const Default: StoryObj<DemoComponent> = { args: { label: 'New' } };
