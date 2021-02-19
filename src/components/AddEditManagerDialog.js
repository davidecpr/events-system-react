import React from "react";
import {Button, Dialog, DialogContent, DialogTitle, Grid} from "@material-ui/core";
import {Field, Form} from "react-final-form";
import TextFieldWrapper from "./Form/TextFieldWrapper";
import {inject, observer} from "mobx-react";
import {DropzoneArea} from "material-ui-dropzone";

@inject('managerStore')
@observer
class AddEditManagerDialog extends React.Component {

  validate = values => {
    const error = {};
    if (!values.name) {
      Object.assign(error, {
        name: 'Field is required'
      })
    }

    if (!values.website) {
      Object.assign(error, {
        website: 'Field is required'
      })
    }

    if (!values.email) {
      Object.assign(error, {
        email: 'Field is required'
      })
    }

    if (!values.description) {
      Object.assign(error, {
        description: 'Field is required'
      })
    }

    return error
  }

  render() {
    const {managerStore, handleFormSubmit} = this.props

    return(
      <Dialog
        fullWidth={true}
        maxWidth={'sm'}
        open={managerStore.openAddEditDialog}
        onClose={() => console.log("close")}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle
          id="max-width-dialog-title">{managerStore.currentManager ? 'Edit' : 'Add'} Manager</DialogTitle>
        <DialogContent>
          <Form
            onSubmit={handleFormSubmit}
            validate={this.validate}
            mutators={{}}
            initialValues={managerStore.currentManager || {}}
            render={({handleSubmit, values, mutators, valid, form}) => {
              return (
                <form id='addEditManager' onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item md={6} style={{display: 'none'}}>
                      <Field
                        fullWidth
                        name={'_id'}
                        component={TextFieldWrapper}
                        type='text'
                        label='ID'
                      />
                    </Grid>
                    <Grid item md={4}>
                      <Field
                        variant={'outlined'}
                        fullWidth
                        name={'name'}
                        component={TextFieldWrapper}
                        type='text'
                        label='Name'
                      />
                    </Grid>
                    <Grid item md={4}>
                      <Field
                        variant={'outlined'}
                        fullWidth
                        name={'website'}
                        component={TextFieldWrapper}
                        type='url'
                        label='Website'
                      />
                    </Grid>
                    <Grid item md={4}>
                      <Field
                        variant={'outlined'}
                        fullWidth
                        name={'email'}
                        component={TextFieldWrapper}
                        type='email'
                        label='Email'
                      />
                    </Grid>
                    <Grid item md={12}>
                      <Field
                        multiline
                        rows={4}
                        variant={'outlined'}
                        fullWidth
                        name={'description'}
                        component={TextFieldWrapper}
                        type='text'
                        label='Description'
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{marginTop: 20, marginBottom: 20}}>
                    <Grid item xs={6}>
                      <Button color={'secondary'} variant={'outlined'} onClick={() => managerStore.toggleAddEditDialog(null)}
                              fullWidth>Cancel</Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button type={'submit'} color={'primary'} variant={'outlined'} fullWidth>Save</Button>
                    </Grid>
                  </Grid>
                </form>
              )
            }}
          />
        </DialogContent>
      </Dialog>
    )
  }
}

export default AddEditManagerDialog