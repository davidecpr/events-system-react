import {action, observable} from "mobx";
import {appClient} from "../utils/clients";

class UserStore {

  @observable userAuthorization = null

  @action
  async login(user) {
    try {
      const response = await appClient.post('/signin', user)
      const JWT = response.data.token
      this.userAuthorization = `Bearer ${JWT}`
      localStorage.setItem('JWT', JWT)
    } catch (e) {
      throw e
    }
  }

  @action
  async signup(user) {
    try {
      const response = await appClient.post('/signup', user)
      const JWT = response.data.token
      this.userAuthorization = `Bearer ${JWT}`
      localStorage.setItem('JWT', JWT)
    } catch (e) {
      throw e
    }
  }

}

export const userStore = new UserStore()