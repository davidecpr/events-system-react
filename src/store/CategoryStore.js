import {action, observable} from "mobx";
import {appClient} from "../utils/clients";

class CategoryStore {

  @observable categories = []
  @observable currentCategory = null
  @observable openAddEditDialog = false
  @observable showProgress = false

  @action
  async getAll() {
    try {
      this.showProgress = true
      this.categories = []
      const response = await appClient.post('/category/all', {})
      this.categories = response.data
      console.log(this.categories)
    } catch (e) {
      throw e
    } finally {
      this.showProgress = false
    }
  }

  @action
  async addEdit(category) {
    try {
      this.showProgress = true
      //get jwt token
      const JWT = localStorage.getItem('JWT')
      if (!category._id) {
        await appClient.post('/api/category/', category, {headers: {Authorization: `Bearer ${JWT}`}})
      } else {
        await appClient.put(`/api/category/${category._id}`, category, {headers: {Authorization: `Bearer ${JWT}`}})
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
  async delete(category) {
    try {
      this.showProgress = true
      //get jwt token
      const JWT = localStorage.getItem('JWT')
      await appClient.delete(`/api/category/${category._id}`, {headers: {Authorization: `Bearer ${JWT}`}})
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
      this.categories = []
      const response = await appClient.post('/category/all', {query: query})
      this.categories = response.data
    } catch (e) {
      throw e
    } finally {
      this.showProgress = false
    }
  }

  @action
  openDialog(category) {
    this.openAddEditDialog = true
    this.currentCategory = category
  }

  @action
  clearCategory() {
    this.openAddEditDialog = false
    this.currentCategory = null
  }

}

export const categoryStore = new CategoryStore();