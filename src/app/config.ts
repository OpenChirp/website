export class Configuration {
  api_base_url = '/'; // trick for any hostname
  api_url: string = this.api_base_url + 'apiv1/';
  auth_url: string = this.api_base_url + 'authv1/';

  google_auth_client_id = '8799600805-r708mvl77fe1f5fu71r6sbo366m6e7r5.apps.googleusercontent.com';

  // The web_base_url should not be depended on.
  // If it is anything other than "/", it makes it difficult to deploy on Docker.
  // This field is only used in the grafana_url and mapper_url config settings.
  web_base_url = '/';
  grafana_url: string = this.web_base_url + 'grafana/';
  mapper_url: string = this.web_base_url + 'mapper/';
  mapper_url_public: string = this.mapper_url + 'map/public/all';
  mapper_url_owner: string = this.mapper_url + 'map/owner/';
  mapper_url_device: string = this.mapper_url + 'map/device/'; // Unused

  splash_map_url = 'https://res.openchirp.io/leaflet/index.html';
  signup_enable = true; // controls if signup is allowed on web-front
}
