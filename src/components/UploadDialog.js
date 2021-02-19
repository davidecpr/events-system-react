import React from "react";
import {Button, Dialog, DialogContent, DialogTitle, Grid} from "@material-ui/core";
import {Field, Form} from "react-final-form";
import Dropzone from "./Dropzone";
import {inject, observer} from "mobx-react";

@inject('managerStore')
@observer
class UploadDialog extends React.Component {

  render() {

    const {managerStore, handleUpload} = this.props

    return(
      <Dialog
        fullWidth={true}
        maxWidth={'sm'}
        open={managerStore.openUploadDialog}
        onClose={() => console.log("close")}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle
          id="max-width-dialog-title">Upload Image</DialogTitle>
        <DialogContent>
          <Form
            onSubmit={values => handleUpload(values)}
            render={({handleSubmit, values, mutators, valid, form}) => {
              return (
                <form id='uploadImage' onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item md={12}>
                      <Field name={'logo'} component={Dropzone}/>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} style={{marginTop: 20, marginBottom: 20}}>
                    <Grid item xs={6}>
                      <Button color={'secondary'} variant={'outlined'} onClick={() => managerStore.toggleUploadDialog(null)}
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

export default UploadDialog