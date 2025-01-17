// global.d.ts
import Qumra from 'qumra-gearbox';

declare global {
  interface Window {
    Qumra: typeof Qumra;
    __qumra__: any
  }
}

export {};