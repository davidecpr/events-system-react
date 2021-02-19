import {action, observable} from "mobx";
import {appClient} from "../utils/clients";

class ManagersStore {

  @observable managers = []
  @observable currentManager = null
  @observable openAddEditDialog = false
  @observable openUploadDialog = false
  @observable showProgress = false

  @action
  async getAll() {
    try {
      this.managers = []
      this.showProgress = true
      const response = await appClient.post('/managers/all', {})
      this.managers = response.data
    } catch (e) {
      throw e
    } finally {
      this.showProgress = false
    }
  }

  @action
  async addEdit(manager) {
    try {
      this.showProgress = true
      //get jwt token
      const JWT = localStorage.getItem('JWT')
      if (!manager._id) {
        await appClient.post('/api/managers', manager, {headers: {Authorization: `Bearer ${JWT}`}})
      } else {
        await appClient.put(`/api/managers/${manager._id}`, manager, {headers: {Authorization: `Bearer ${JWT}`}})
      }
      await this.getAll()
      this.openAddEditDialog = false
    } catch (e) {
      throw e
    } finally {
      this.showProgress = false
    }
  }

  @action
  async delete(manager) {
    try {
      this.showProgress = true
      //get jwt token
      const JWT = localStorage.getItem('JWT')
      await appClient.delete(`/api/managers/${manager._id}`, {headers: {Authorization: `Bearer ${JWT}`}})
      await this.getAll()
    } catch (e) {
      throw e
    } finally {
      this.showProgress = false
    }
  }

  @action
  async search(query) {
    try {
      this.showProgress = true
      this.managers = []
      const response = await appClient.post('/managers/all', {query: query})
      this.managers = response.data
    } catch (e) {
      throw e
    } finally {
      this.showProgress = false
    }
  }

  @action
  async uploadLogo(logo) {
    try {
      this.showProgress = true
      //get jwt token
      const JWT = localStorage.getItem('JWT')
      //build form data
      const formData = new FormData();
      formData.append('logo', logo)
      await appClient.post(`/api/managers/logo/${this.currentManager._id}`, formData,{headers: {Authorization: `Bearer ${JWT}`}})
      await this.getAll()
      this.toggleUploadDialog(null)
    } catch (e) {
      throw e
    } finally {
      this.showProgress = false
    }
  }

  @action
  toggleAddEditDialog(manager) {
    this.currentManager = this.openAddEditDialog ? null : manager
    this.openAddEditDialog = !this.openAddEditDialog
  }

  @action
  toggleUploadDialog(manager) {
    this.currentManager = this.openUploadDialog ? null : manager
    this.openUploadDialog = !this.openUploadDialog
  }

}

export const managersStore = new ManagersStore();