class MutableImage {

    private _data: ImageData;

    constructor(imageData: ImageData) {
        this._data = imageData;
    }

    get data(): ImageData {
        return this._data;
    }

    public setPixel = (x: number, y: number, r: number, g: number, b: number, a: number) => {
        var index: number = (x + y * this.data.width) * 4;
        this.data.data[index + 0] = r;
        this.data.data[index + 1] = g;
        this.data.data[index + 2] = b;
        this.data.data[index + 3] = a;
    };
}