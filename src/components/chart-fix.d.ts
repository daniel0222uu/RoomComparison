// src/chart-fix.d.ts
import { Chart } from 'chart.js';

// Override Chart.js types to allow our custom tooltip callback
declare module 'chart.js' {
    interface TooltipCallbacks {
        label?: (context: any) => string | string[] | void;
    }
}