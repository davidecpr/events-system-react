import React from "react";
import {Button, Dialog, DialogContent, DialogTitle, Grid} from "@material-ui/core";
import {inject, observer} from "mobx-react";
import {Field, Form} from "react-final-form";
import TextFieldWrapper from "./Form/TextFieldWrapper";


@inject('categoryStore')
@observer
class AddEditCategoryDialog extends React.Component {

  validate = values => {
    const error = {};
    if (!values.name) {
      Object.assign(error, {
        name: 'Field is required'
      })
    }

    if (!values.slug) {
      Object.assign(error, {
        slug: 'Field is required'
      })
    }

    if (!values.description) {
      Object.assign(error, {
        description: 'Field is required'
      })
    }

    if (!values.icon) {
      Object.assign(error, {
        icon: 'Field is required'
      })
    }

    return error
  }

  render() {

    const {categoryStore, handleFormSubmit} = this.props

    return(
      <Dialog
        fullWidth={true}
        maxWidth={'sm'}
        open={categoryStore.openAddEditDialog}
        onClose={() => console.log("close")}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle
          id="max-width-dialog-title">{categoryStore.currentCategory ? 'Edit' : 'Add'} Category</DialogTitle>
        <DialogContent>
          <Form
            onSubmit={handleFormSubmit}
            validate={this.validate}
            mutators={{}}
            initialValues={categoryStore.currentCategory || {}}
            render={({handleSubmit, values, mutators, valid, form}) => {
              return (
                <form id='addEditCategory' onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item md={6} style={{display: 'none'}}>
                      <Field
                        fullWidth
                        name={'id'}
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
                        name={'slug'}
                        component={TextFieldWrapper}
                        type='text'
                        label='Slug'
                      />
                    </Grid>
                    <Grid item md={4}>
                      <Field
                        placeholder={'fa fa-icon'}
                        variant={'outlined'}
                        fullWidth
                        name={'icon'}
                        component={TextFieldWrapper}
                        type='text'
                        label='Icon'
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
                      <Button color={'secondary'} variant={'outlined'} onClick={() => categoryStore.clearCategory()}
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

export default AddEditCategoryDialog