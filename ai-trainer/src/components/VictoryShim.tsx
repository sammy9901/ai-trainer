// Thin shim to work around TypeScript named export typings for victory-native
// at certain versions. At runtime, components are present; we relax types here.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const victory: any = require('victory-native');

export const VictoryChart = victory.VictoryChart as React.ComponentType<any>;
export const VictoryLine = victory.VictoryLine as React.ComponentType<any>;
export const VictoryTheme = victory.VictoryTheme as any;

