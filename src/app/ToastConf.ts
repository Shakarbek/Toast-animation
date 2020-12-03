import {InjectionToken} from '@angular/core';
import { Toasts } from './toastInter.module';

export const TOAST_CONFIG = new InjectionToken<Toasts>('toast-token');