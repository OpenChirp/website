export class Service {
    name: string;
    description: string;
    config_required: string;
    properties: string;
    _id: string;

    constructor(name: string,
                description: string,
                config_required: string,
                properties: string,
                _id: string) {
        this.name = name;
        this.description = description;
        this.properties = properties;
        this.config_required = config_required;
        this._id = _id;

    }
}
