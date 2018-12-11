export class Device {
    name: string;
    properties: string;
    type: string;
    enabled: boolean;
    _id: string;
    linked_services: Array<Object>;
    transducers: Array<Object>;
    commands: Array<Object>;
    owner: any;
    location_id: any;
    isDeviceGroup: boolean;
    __t: string;
    combined_pubsub: boolean;
    devices: Array<string>;

    constructor(name: string,
                properties: string,
                type: string,
                enabled: boolean,
                linked_services: Array<Object>,
                transducers: Array<Object>,
                isDeviceGroup: boolean = false,
                combined_pubsub: boolean = false,
                devices: Array<string> = []) {
        this.name = name;
        this.properties = properties;
        this.type = type;
        this.enabled = enabled;
        this.linked_services = linked_services;
        this.transducers = transducers;
        this.isDeviceGroup = isDeviceGroup;
        this.combined_pubsub = combined_pubsub;
        this.devices = devices;
    }
}
