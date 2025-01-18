// global.d.ts
import Qumra from 'qumra-gearbox';
import { CartType } from './cart.js';

declare global {
  interface Window {
    [key: string]: any;
    Qumra:  typeof Qumra;
    __qumra__: {
      context: {
        [x: string]: any;
        cart: CartType
      }
    }
  }
}

export {};