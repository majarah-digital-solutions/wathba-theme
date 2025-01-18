// global.d.ts
import QumraL from 'qumra-gearbox';
import { CartType } from './cart.js';

declare global {
  const Qumra: typeof QumraL;

  interface Window {
    [key: string]: any;
    __qumra__?: {
      context: {
        [x: string]: any;
        cart: CartType;
      };
    };
  }
}

export {};
