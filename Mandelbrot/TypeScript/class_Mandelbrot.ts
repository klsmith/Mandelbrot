class Mandelbrot {

    static get MAX_ITERATIONS(): number { return 255; }
    static get X_MAX(): number { return 1; }
    static get X_MIN(): number { return -2; }
    static get Y_MAX(): number { return -1; }
    static get Y_MIN(): number { return 1; }

    private _canvas: HTMLCanvasElement;
    private _context: CanvasRenderingContext2D;
    private _x: number;
    private _y: number;
    private _width: number;
    private _height: number;
    private _image: MutableImage;

    constructor(canvas: HTMLCanvasElement, x: number = 0, y: number = 0, width?: number, height?: number) {
        this._canvas = canvas;
        this._context = canvas.getContext("2d");
        this._x = x;
        this._y = y;
        this._width = (width === undefined ? canvas.width : width);
        this._height = (height === undefined ? canvas.height : height);
        this._image = new MutableImage(this.context.createImageData(this.width, this.height));
        this.generateImage();
    }

    private generateImage = () => {
        for (var x: number = 0; x < this.width; ++x) {
            for (var y: number = 0; y < this.height; ++y) {
                var z: number = 0;
                var zi: number = 0;
                var inSet: boolean = true;
                var newZ: number;
                var newZi: number;
                var numIterations: number = 0;
                for (var i: number = 0; i < Mandelbrot.MAX_ITERATIONS; ++i) {
                    var coord: [number, number] = this.getCoord(x, y);
                    newZ = (z * z) - (zi * zi) + coord[0];
                    newZi = 2 * z * zi + coord[1];
                    z = newZ;
                    zi = newZi;
                    if (((z * z) + (zi * zi)) > 4) {
                        inSet = false;
                        numIterations = i;
                        i = Mandelbrot.MAX_ITERATIONS;
                    }
                }
                if (inSet) {
                    this.image.setPixel(x, y, 0, 0, 0, 255);
                } else {
                    if (Util.isPrime(numIterations)) {
                        this.image.setPixel(x, y, 255, numIterations, numIterations, 255);
                    } else {
                        this.image.setPixel(x, y, numIterations, numIterations, numIterations, 255);
                    }

                }
            }
        }
    };

    get canvas(): HTMLCanvasElement {
        return this._canvas;
    }

    get context(): CanvasRenderingContext2D {
        return this._context;
    }

    get x(): number {
        return this._x;
    }

    set x(value: number) {
        this._x = value;
    }

    get y(): number {
        return this._y;
    }

    set y(value: number) {
        this._y = value;
    }

    get width(): number {
        return this._width;
    }

    get height(): number {
        return this._height;
    }

    static get xScale(): number {
        return Mandelbrot.X_MAX - Mandelbrot.X_MIN;
    }

    static get yScale(): number {
        return Mandelbrot.Y_MAX - Mandelbrot.Y_MIN;
    }

    private get image(): MutableImage {
        return this._image;
    }

    private getCoord = (x: number, y: number): [number, number] => {
        let resultX: number = Mandelbrot.X_MIN + x * Mandelbrot.xScale / this.width;
        let resultY: number = Mandelbrot.Y_MIN + y * Mandelbrot.yScale / this.height;
        return [resultX, resultY];
    };

    public draw = () => {
        this.context.putImageData(this.image.data, this.x, this.y);
    };
}