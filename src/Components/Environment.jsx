
class Environment {

  constructor() {
    this.isHeroku = this.isHeroku.bind(this);
    this.getRootUrl = this.getRootUrl.bind(this);
  }

  isHeroku(){
    let _isHeroku = false;
    if (window.location.hostname === 'recess-prototype.herokuapp.com') {
      _isHeroku = true;
    }
    return _isHeroku;
  }

  getRootUrl() {
    let rootUrl = 'https://recess-api.herokuapp.com'
    if (this.isHeroku()) {
      rootUrl = "https://recess-api.herokuapp.com";
    } 
    return rootUrl;
  }
}
export default Environment;