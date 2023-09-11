import 'jquery';

declare global {
  interface JQuery {
    modal(action: string): void;
  }
}