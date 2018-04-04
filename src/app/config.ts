export class Configuration {
  base_url: string = "https://openchirp.io/";
  api_url: string = this.base_url + "apiv1/";
  auth_url: string = this.base_url + "authv1/";
  google_auth: string = this.auth_url + "google/token";
  google_auth_client_id: string="blahh.apps.googleusercontent.com";

  logout_url: string = this.auth_url + "logout/";

  grafana_url: string = this.base_url + "grafana/";

  mapper_url: string = this.base_url + "mapper/";
  mapper_url_public: string = this.mapper_url + "map/public/all";
  mapper_url_owner: string = this.mapper_url + "map/owner/";
  mapper_url_device: string = this.mapper_url + "map/device/"; // Unused

  splash_map_url: string = "https://res.openchirp.io/leaflet/index.html";
}
