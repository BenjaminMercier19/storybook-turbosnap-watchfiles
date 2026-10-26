import type { StorybookConfig } from '@storybook/angular-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.ts'],
  framework: { name: '@storybook/angular-vite', options: { jit: true } },
  core: { disableTelemetry: true },
};
export default config;
