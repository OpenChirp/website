export class Configuration {
  base_url: string = "http://iot.andrew.cmu.edu";
  api_url: string = this.base_url + ":10010/"+"api/";
  auth_url: string = this.base_url + ":10010/"+"auth/";
  
  google_auth_client_id:string="701190672217-a5u7oepjr23de6qjmjus7s0qgkjdddii.apps.googleusercontent.com";

  grafana_url: string = this.base_url + "grafana/";

  mapper_url: string = this.base_url + "mapper/";
  mapper_url_public: string = this.mapper_url + "map/public/all";
  mapper_url_owner: string = this.mapper_url + "map/owner/";
  mapper_url_device: string = this.mapper_url + "map/device/"; // Unused

  splash_map_url: string = "https://res.openchirp.io/leaflet/index.html";
}
