export class Location {
    name: string;
    children : Array<string>;
    _id: string;
    type: string;

    constructor(_id: string, name: string, children: Array<string>) {
        this.name = name;
        this.children = children;
        this._id = _id;
    }
}