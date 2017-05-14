export class Configuration {
<<<<<<< HEAD
  base_url: string = "http://openchirp.andrew.cmu.edu:10010/";
=======
  base_url: string = "http://openchirp.andrew.cmu.edu:7000/"; 
>>>>>>> bc7fbc417075ee128d2cbf1722477229c0065155
  api_url: string = this.base_url + "api/";
  auth_url: string = this.base_url + "auth/";
  google_auth: string = this.auth_url + "google/";
  logout_url: string = this.auth_url + "logout/";
}
