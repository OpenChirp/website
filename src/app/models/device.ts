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
  broadcast_transducers: Array<Object>;
  broadcast_commands: Array<Object>;

  constructor(name: string,
              properties: string,
              type: string,
              enabled: boolean,
              linked_services: Array<Object>,
              transducers: Array<Object>,
              isDeviceGroup = false,
              combined_pubsub = false,
              devices: Array<string> = [],
              broadcast_transducers: Array<string> = [],
              broadcast_commands: Array<string> = []) {
    this.name = name;
    this.properties = properties;
    this.type = type;
    this.enabled = enabled;
    this.linked_services = linked_services;
    this.transducers = transducers;
    this.isDeviceGroup = isDeviceGroup;
    this.combined_pubsub = combined_pubsub;
    this.devices = devices;
    this.broadcast_transducers = broadcast_transducers;
    this.broadcast_commands = broadcast_commands;
  }
}
