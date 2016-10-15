var Main = (function () {
    function Main() {
    }
    Main.main = function () {
        var canvas = document.getElementById("myCanvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        var mandlebrots = [];
        var tileWidth = 640;
        var tileHeight = 480;
        for (var y = 0; y <= canvas.height; y += tileHeight) {
            mandlebrots[y] = [];
            for (var x = 0; x <= canvas.width; x += tileWidth) {
                console.log("coord[" + x + ", " + y + "]");
                mandlebrots[y][x] = new Mandelbrot(canvas, x, y, tileWidth, tileHeight);
                mandlebrots[y][x].draw();
            }
        }
    };
    return Main;
}());
var Mandelbrot = (function () {
    function Mandelbrot(canvas, x, y, width, height) {
        var _this = this;
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.generateImage = function () {
            for (var x = 0; x < _this.width; ++x) {
                for (var y = 0; y < _this.height; ++y) {
                    var z = 0;
                    var zi = 0;
                    var inSet = true;
                    var newZ;
                    var newZi;
                    var numIterations = 0;
                    for (var i = 0; i < Mandelbrot.MAX_ITERATIONS; ++i) {
                        var coord = _this.getCoord(x, y);
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
                        _this.image.setPixel(x, y, 0, 0, 0, 255);
                    }
                    else {
                        if (Util.isPrime(numIterations)) {
                            _this.image.setPixel(x, y, 255, numIterations, numIterations, 255);
                        }
                        else {
                            _this.image.setPixel(x, y, numIterations, numIterations, numIterations, 255);
                        }
                    }
                }
            }
        };
        this.getCoord = function (x, y) {
            var resultX = Mandelbrot.X_MIN + x * Mandelbrot.xScale / _this.width;
            var resultY = Mandelbrot.Y_MIN + y * Mandelbrot.yScale / _this.height;
            return [resultX, resultY];
        };
        this.draw = function () {
            _this.context.putImageData(_this.image.data, _this.x, _this.y);
        };
        this._canvas = canvas;
        this._context = canvas.getContext("2d");
        this._x = x;
        this._y = y;
        this._width = (width === undefined ? canvas.width : width);
        this._height = (height === undefined ? canvas.height : height);
        this._image = new MutableImage(this.context.createImageData(this.width, this.height));
        this.generateImage();
    }
    Object.defineProperty(Mandelbrot, "MAX_ITERATIONS", {
        get: function () { return 255; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mandelbrot, "X_MAX", {
        get: function () { return 1; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mandelbrot, "X_MIN", {
        get: function () { return -2; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mandelbrot, "Y_MAX", {
        get: function () { return -1; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mandelbrot, "Y_MIN", {
        get: function () { return 1; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mandelbrot.prototype, "canvas", {
        get: function () {
            return this._canvas;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mandelbrot.prototype, "context", {
        get: function () {
            return this._context;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mandelbrot.prototype, "x", {
        get: function () {
            return this._x;
        },
        set: function (value) {
            this._x = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mandelbrot.prototype, "y", {
        get: function () {
            return this._y;
        },
        set: function (value) {
            this._y = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mandelbrot.prototype, "width", {
        get: function () {
            return this._width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mandelbrot.prototype, "height", {
        get: function () {
            return this._height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mandelbrot, "xScale", {
        get: function () {
            return Mandelbrot.X_MAX - Mandelbrot.X_MIN;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mandelbrot, "yScale", {
        get: function () {
            return Mandelbrot.Y_MAX - Mandelbrot.Y_MIN;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mandelbrot.prototype, "image", {
        get: function () {
            return this._image;
        },
        enumerable: true,
        configurable: true
    });
    return Mandelbrot;
}());
var MutableImage = (function () {
    function MutableImage(imageData) {
        var _this = this;
        this.setPixel = function (x, y, r, g, b, a) {
            var index = (x + y * _this.data.width) * 4;
            _this.data.data[index + 0] = r;
            _this.data.data[index + 1] = g;
            _this.data.data[index + 2] = b;
            _this.data.data[index + 3] = a;
        };
        this._data = imageData;
    }
    Object.defineProperty(MutableImage.prototype, "data", {
        get: function () {
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    return MutableImage;
}());
var Util = (function () {
    function Util() {
    }
    Util.isPrime = function (n) {
        if (isNaN(n) || !isFinite(n) || n % 1 || n < 2) {
            return false;
        }
        if (n === Util.leastFactor(n)) {
            return true;
        }
        return false;
    };
    Util.leastFactor = function (n) {
        if (isNaN(n) || !isFinite(n)) {
            return NaN;
        }
        if (n === 0) {
            return 0;
        }
        if (n % 1 || n * n < 2) {
            return 1;
        }
        if (n % 2 === 0) {
            return 2;
        }
        if (n % 3 === 0) {
            return 3;
        }
        if (n % 5 === 0) {
            return 5;
        }
        var m = Math.sqrt(n);
        for (var i = 7; i <= m; i += 30) {
            if (n % i === 0) {
                return i;
            }
            if (n % (i + 4) === 0) {
                return i + 4;
            }
            if (n % (i + 6) === 0) {
                return i + 6;
            }
            if (n % (i + 10) === 0) {
                return i + 10;
            }
            if (n % (i + 12) === 0) {
                return i + 12;
            }
            if (n % (i + 16) === 0) {
                return i + 16;
            }
            if (n % (i + 22) === 0) {
                return i + 22;
            }
            if (n % (i + 24) === 0) {
                return i + 24;
            }
        }
        return n;
    };
    return Util;
}());
//# sourceMappingURL=app.js.map