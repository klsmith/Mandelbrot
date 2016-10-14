class Main {
    public static main(): void {
        var canvas = <HTMLCanvasElement>document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        var width = canvas.width;
        var height = canvas.height;

        var imageData = ctx.createImageData(width, height);

        var xMax = 1;
        var xMin = -2;
        var yMax = -1;
        var yMin = 1;
        var maxIterations = 255;


        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, 1800, 1000);

        var xScale = function () { return xMax - xMin };
        var yScale = function () { return yMax - yMin };

        function setPixel(imageData, x, y, r, g, b, a) {
            var index = (x + y * imageData.width) * 4;
            imageData.data[index + 0] = r;
            imageData.data[index + 1] = g;
            imageData.data[index + 2] = b;
            imageData.data[index + 3] = a;
        }

        var isPrime = function (n) {
            if (isNaN(n) || !isFinite(n) || n % 1 || n < 2) return false;
            if (n == leastFactor(n)) return true;
            return false;
        }

        // leastFactor(n)
        // returns the smallest prime that divides n
        //     NaN if n is NaN or Infinity
        //      0  if n=0
        //      1  if n=1, n=-1, or n is not an integer

        var leastFactor = function (n) {
            if (isNaN(n) || !isFinite(n)) return NaN;
            if (n == 0) return 0;
            if (n % 1 || n * n < 2) return 1;
            if (n % 2 == 0) return 2;
            if (n % 3 == 0) return 3;
            if (n % 5 == 0) return 5;
            var m = Math.sqrt(n);
            for (var i = 7; i <= m; i += 30) {
                if (n % i == 0) return i;
                if (n % (i + 4) == 0) return i + 4;
                if (n % (i + 6) == 0) return i + 6;
                if (n % (i + 10) == 0) return i + 10;
                if (n % (i + 12) == 0) return i + 12;
                if (n % (i + 16) == 0) return i + 16;
                if (n % (i + 22) == 0) return i + 22;
                if (n % (i + 24) == 0) return i + 24;
            }
            return n;
        }

        function getCoord(x, y) {
            return [xMin + x * xScale() / width, yMin + y * yScale() / height];
        }

        for (var x = 0; x < width; ++x) {
            for (var y = 0; y < height; ++y) {
                var z = 0;
                var zi = 0;
                var inSet = true;
                var newZ;
                var newZi;
                var numIterations = 0;
                for (var i = 0; i < maxIterations; ++i) {
                    var coord = getCoord(x, y);
                    //debugger;
                    newZ = (z * z) - (zi * zi) + coord[0];
                    newZi = 2 * z * zi + coord[1];

                    z = newZ;
                    zi = newZi;
                    if (((z * z) + (zi * zi)) > 4) {
                        inSet = false;
                        numIterations = i;
                        i = maxIterations;
                    }
                }
                if (inSet) {
                    setPixel(imageData, x, y,
                        0, 0, 0, 255);
                }
                else {


                    if (isPrime(numIterations)) {
                        setPixel(imageData, x, y, 255, numIterations, numIterations, 255);
                    }
                    else {
                        setPixel(imageData, x, y,
                            numIterations, numIterations, numIterations, 255);
                    }

                }
            }
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.putImageData(imageData, 0, 0);
    }
}