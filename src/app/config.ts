export class Configuration {
  base_url: string = "https://openchirp.io/";
  api_url: string = this.base_url + "apiv1/";
  auth_url: string = this.base_url + "authv1/";
  
  google_auth_client_id:string="8799600805-r708mvl77fe1f5fu71r6sbo366m6e7r5.apps.googleusercontent.com";

  grafana_url: string = this.base_url + "grafana/";

  mapper_url: string = this.base_url + "mapper/";
  mapper_url_public: string = this.mapper_url + "map/public/all";
  mapper_url_owner: string = this.mapper_url + "map/owner/";
  mapper_url_device: string = this.mapper_url + "map/device/"; // Unused

  splash_map_url: string = "https://res.openchirp.io/leaflet/index.html";
}
