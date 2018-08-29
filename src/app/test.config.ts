export class Configuration {
  base_url: string = "https://testing.openchirp.io/";
  api_url: string = this.base_url + "api/";
  auth_url: string = this.base_url + "auth/";

  google_auth_client_id:string="80076401627-4t634gttm4tgn5kck9g2jv7o1asou9ad.apps.googleusercontent.com";

  grafana_url: string = this.base_url + "grafana/";

  mapper_url: string = this.base_url + "mapper/";
  mapper_url_public: string = this.mapper_url + "map/public/all";
  mapper_url_owner: string = this.mapper_url + "map/owner/";
  mapper_url_device: string = this.mapper_url + "map/device/"; // Unused

  splash_map_url: string = "https://res.openchirp.io/leaflet/index.html";
  signup_enable: boolean = true; // controls if signup is allowed on web-front
}
