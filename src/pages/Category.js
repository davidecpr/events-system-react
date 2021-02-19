import React from "react";
import {
  Backdrop,
  Button, CircularProgress,
  Snackbar, withStyles,
} from "@material-ui/core";
import {inject, observer} from "mobx-react";
import AddEditCategoryDialog from "../components/AddEditCategoryDialog";
import Alert from "../components/SnackBarAlert";
import CustomTable from "../components/CustomTable";
import CategoryStyle from '../styles/CategoryStyle'
import CustomSearchBar from "../components/CustomSearchBar";
import {managersStore} from "../store/ManagersStore";

@inject('categoryStore')
@observer
class Category extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      alert: {
        show: false,
        type: '',
        message: ''
      }
    }
  }

  async componentDidMount() {

    const {categoryStore} = this.props

    try {
      await categoryStore.getAll()
    } catch (e) {
      console.error(e)
    }
  }

  handleFormSubmit = async (values) => {
    const {categoryStore} = this.props

    try {

      const alert = {
        show: true,
        type: 'success',
      }

      await categoryStore.addEdit(values)

      if (!values.hasOwnProperty('_id')) {
        Object.assign(alert, {
          message: 'Categoria creata con successo'
        })
      } else {
        Object.assign(alert, {
          message: 'Categoria aggiornata successo'
        })
      }

      this.setState({
        alert: alert
      })
    } catch (e) {
      const alert = {
        show: true,
        type: 'error',
        message: e.response.data.message
      }

      this.setState({
        alert: alert
      })
    }
  }

  handleDelete = async (category) => {
    const {categoryStore} = this.props

    try {
      await categoryStore.delete(category)

      const alert = {
        show: true,
        type: 'success',
        message: 'Categoria eliminata con successo'
      }

      this.setState({
        alert: alert
      })

    } catch (e) {
      const alert = {
        show: true,
        type: 'error',
        message: 'C\'è stato un errore, per cortesia riprova'
      }

      this.setState({
        alert: alert
      })
    }
  }

  handleEdit = (category) => {
    const {categoryStore} = this.props
    categoryStore.openDialog(category)
  }

  onSearchHandle = async (values) => {
    //handle search
    const {categoryStore} = this.props
    if (values.length > 3) {
      const {categoryStore} = this.props
      await categoryStore.search(values)
    } else if (values.length === 0) {
      await categoryStore.getAll()
    }
  }

  render() {

    const {categoryStore, classes} = this.props
    const {alert} = this.state

    const columns = [
      {name: 'actions', headerName: 'Actions'},
      {name: 'name', headerName: 'Name'},
      {name: 'slug', headerName: 'Slug'},
      {name: 'description', headerName: 'Description'},
      {name: 'icon', headerName: 'Icon', fa: true},
    ]

    return (
      <React.Fragment>
        <div className={classes.headerDiv}>
          <Button
            style={{marginRight: 10}}
            variant={'contained'}
            color={'primary'}
            onClick={() => categoryStore.openDialog(null)}>
            Add Category
          </Button>
          <CustomSearchBar onSearchHandle={this.onSearchHandle}/>
        </div>
        <CustomTable
          columns={columns}
          rows={categoryStore.categories}
          handleEdit={this.handleEdit}
          handleDelete={this.handleDelete}/>
        <AddEditCategoryDialog handleFormSubmit={this.handleFormSubmit}/>
        <Snackbar
          open={alert.show}
          autoHideDuration={6000}
          onClose={() => this.setState({alert: {show: false}})}>
          <Alert severity={alert.type}>
            {alert.message}
          </Alert>
        </Snackbar>
        <Backdrop className={classes.backdrop} open={categoryStore.showProgress}>
          <CircularProgress color="inherit"/>
        </Backdrop>
      </React.Fragment>
    )
  }
}

export default withStyles(CategoryStyle, {withTheme: true})(Category)