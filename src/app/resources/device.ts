export class Device {
    name: string;
    properties: string;
    type: string;
    enabled: boolean;

    constructor(name: string, properties: string, type: string, enabled: boolean) {
        this.name = name;
        this.properties = properties;
        this.type = type;
        this.enabled = enabled;
    }
}