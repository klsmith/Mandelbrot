class Main {
    public static main(): void {
        let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("myCanvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        let mandlebrots: Mandelbrot[][] = [];
        let tileWidth: number = 640;
        let tileHeight: number = 480;
        for (let y: number = 0; y <= canvas.height; y += tileHeight) {
            mandlebrots[y] = [];
            for (let x: number = 0; x <= canvas.width; x += tileWidth) {
                console.log("coord[" + x + ", " + y + "]");
                mandlebrots[y][x] = new Mandelbrot(canvas, x, y, tileWidth, tileHeight);
                mandlebrots[y][x].draw();
            }
        }
    }
}