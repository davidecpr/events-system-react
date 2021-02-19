import React from "react";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  withStyles
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {inject, observer} from "mobx-react";
import CustomTableStyle from "../styles/CustomTableStyle";
import ManagerLogo from "./ManagerLogo";
import {CloudUploadRounded} from "@material-ui/icons";

@inject('categoryStore')
@inject('managerStore')
@observer
class CustomTable extends React.Component {

  handleManagerEditLogo = (manager) => {
    const {managerStore} = this.props
    managerStore.toggleUploadDialog(manager)
  }

  render() {

    const {classes, columns, rows, handleEdit, handleDelete, managerStore} = this.props

    return (
      <TableContainer component={Paper} className={classes.table}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell>{column.headerName}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => {
              return (
                <TableRow key={row._id}>
                  {columns.map(column => (
                    column.name !== 'actions' ?
                      column.media ?
                        <TableCell style={{textAlign: 'center', margin: 'auto'}}>
                          {
                            row[column.name] !== undefined ?

                              <ManagerLogo manager={row} handleEdit={this.handleManagerEditLogo}/> :
                              <IconButton onClick={() => managerStore.toggleUploadDialog(row)}>
                                <CloudUploadRounded/>
                              </IconButton>
                          }
                        </TableCell>
                        :
                        <TableCell>
                          {column.fa ? (
                              <FontAwesomeIcon
                                icon={row[column.name].substring(row[column.name].indexOf('-') + 1)}
                                size="2x"/>)
                            :
                            (row[column.name])
                          }
                        </TableCell>
                      :
                      <TableCell>
                        <IconButton onClick={() => handleEdit(row)}><EditIcon/></IconButton>
                        <IconButton onClick={() => handleDelete(row)}><DeleteIcon/></IconButton>
                      </TableCell>
                  ))}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
}

export default withStyles(CustomTableStyle)(CustomTable)