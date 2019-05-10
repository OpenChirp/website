export class User {
    name: string;
    email: string;
    write_access: boolean;
    _id: string;

    constructor(name: string,
                email: string,
                write_access: boolean,
                _id: string) {
        this.name = name;
        this.email = email;
        this.write_access = write_access;
        this._id = _id;

    }
}
