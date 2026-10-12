export interface SunsetOptions {
  /** Sun height above the horizon, degrees. Default 2.4 */
  elevation?: number;
  /** Direction of the sun, degrees to the right of the view centre. Default 9 */
  azimuth?: number;
  /** The sun rises and sinks by this many degrees so it never sets. 0 = still. Default 0.35 */
  drift?: number;
  /** Seconds for one drift cycle. Default 480 */
  driftPeriod?: number;
  /** Wind speed, m/s. Default 3.5 */
  wind?: number;
  /** Haze multiplier. 1 = clear air. Default 1.25 */
  turbidity?: number;
  /** Cloud cover, 0..1. Default 0.45 */
  clouds?: number;
  /** Draw hazy headlands on the horizon. Default true */
  coast?: boolean;
  /** Where the coast is, degrees from the view centre. Default -38 */
  coastAzimuth?: number;
  /** Overall brightness. Default 0.30 */
  exposure?: number;
  /** Brightness of the sun glitter on the water. Default 1 */
  glitter?: number;
  /** Size of the sun disc relative to real life. Default 2 */
  sunSize?: number;
  /** Field of view in degrees across the shorter side of the canvas. Default 58 */
  fov?: number;
  /** Horizon position, 0 = bottom of the canvas, 1 = top. Default 0.38 */
  horizon?: number;
  /** Eye height above the water, metres. Default 2 */
  cameraHeight?: number;
  /** Animation speed multiplier. Default 1 */
  speed?: number;
  /** 'auto' or a render scale 0.25..1. Default 'auto' */
  quality?: 'auto' | number;
  /** Highest device pixel ratio to render at. Default 2 */
  maxPixelRatio?: number;
  /** Draw one still frame if the visitor asked for reduced motion. Default true */
  respectReducedMotion?: boolean;
  /** Start animating on creation. Default true */
  autoStart?: boolean;
}

export class Sunset {
  constructor(canvas: HTMLCanvasElement, options?: SunsetOptions);
  readonly canvas: HTMLCanvasElement;
  readonly options: Required<SunsetOptions>;
  readonly running: boolean;
  static isSupported(): boolean;
  setOptions(options: SunsetOptions): void;
  resize(): void;
  start(): void;
  stop(): void;
  render(): void;
  destroy(): void;
}

export default Sunset;
