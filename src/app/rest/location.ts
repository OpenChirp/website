export class Location {
    name: string;
    children : Array<string>;

    constructor(name: string, children: Array<string>) {
        this.name = name;
        this.children = children;
    }
}