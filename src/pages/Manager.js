import React from "react";
import {
  Avatar, Backdrop,
  Button, Card, CircularProgress, Icon,
  IconButton,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow, withStyles
} from "@material-ui/core";
import CustomTable from "../components/CustomTable";
import Alert from "../components/SnackBarAlert";
import {inject, observer} from "mobx-react";
import AddEditManagerDialog from "../components/AddEditManagerDialog";
import UploadDialog from "../components/UploadDialog";
import {managersStore} from "../store/ManagersStore";
import ManagerStyle from "../styles/ManagerStyle";
import CustomSearchBar from "../components/CustomSearchBar";

@inject('managerStore')
@observer
class Manager extends React.Component {

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

    const {managerStore} = this.props

    try {
      await managerStore.getAll()
    } catch (e) {
      console.error(e)
    }
  }

  handleEdit = (manager) => {
    const {managerStore} = this.props
    managerStore.toggleAddEditDialog(manager)
  }

  handleFormSubmit = async (values) => {

    console.log(values)

    const {managerStore} = this.props

    try {
      const alert = {
        show: true,
        type: 'success'
      }

      await managerStore.addEdit(values)

      if (!values.hasOwnProperty('_id')) {
        Object.assign(alert, {
          message: 'Organizzatore creto con successo'
        })
      } else {
        Object.assign(alert, {
          message: 'Organizzatore aggiornato con successo'
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

  handleUpload = async (values) => {
    try {
      await managersStore.uploadLogo(values.logo[0])

      this.setState({
        alert: {
          show: true,
          type: 'success',
          message: 'Logo caricato con successo'
        }
      })
    } catch (e) {
      this.setState({
        alert: {
          show: true,
          type: 'false',
          message: 'C\'è stato un errore, per cortesia riprova'
        }
      })
    }
  }

  handleDelete = async (manager) => {
    const {managerStore} = this.props

    try {
      await managerStore.delete(manager)
      this.setState({
        alert: {
          show: true,
          type: 'success',
          message: 'Organizzatore eliminato con successo'
        }
      })
    } catch (e) {
      this.setState({
        alert: {
          show: true,
          type: 'error',
          message: 'C\'è stato un errore per cortesia riprova'
        }
      })
    }
  }

  onSearchHandle = async (values) => {
    //handle search
    const {managerStore} = this.props
    if (values.length > 3) {
      await managerStore.search(values)
    } else if (values.length === 0) {
      await managerStore.getAll()
    }
  }

  render() {

    const {managerStore, classes} = this.props
    const {alert} = this.state

    const columns = [
      {name: 'actions', headerName: 'Actions'},
      {name: 'name', headerName: 'Name'},
      {name: 'website', headerName: 'Website'},
      {name: 'email', headerName: 'Email'},
      {name: 'description', headerName: 'Description'},
      {name: 'logo', headerName: 'logo', media: true}
    ]

    return (
      <React.Fragment>
        <div className={classes.headerDiv}>
          <Button
            variant={'contained'}
            color={'primary'}
            style={{marginRight: 10}}
            onClick={() => managerStore.toggleAddEditDialog(null)}>Add Manager</Button>
          <CustomSearchBar onSearchHandle={this.onSearchHandle}/>
        </div>
        <CustomTable
          columns={columns}
          rows={managerStore.managers}
          handleEdit={this.handleEdit}
          handleDelete={this.handleDelete}/>
        <AddEditManagerDialog handleFormSubmit={this.handleFormSubmit}/>
        <UploadDialog handleUpload={this.handleUpload}/>
        <Snackbar
          open={alert.show}
          autoHideDuration={6000}
          onClose={() => this.setState({alert: {show: false}})}>
          <Alert severity={alert.type}>
            {alert.message}
          </Alert>
        </Snackbar>
        <Backdrop className={classes.backdrop} open={managerStore.showProgress}>
          <CircularProgress color="inherit"/>
        </Backdrop>
      </React.Fragment>
    )
  }
}

export default withStyles(ManagerStyle, {withTheme: true})(Manager)