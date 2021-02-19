import React from 'react'
import moment from 'moment'
import MomentUtils from '@date-io/moment'
import {MuiPickersUtilsProvider, DatePicker} from '@material-ui/pickers'
import 'moment/locale/it'
import PropTypes from 'prop-types'

moment.locale('it')

const DatePickerWrapper = (props) => {
  const {
    input: {name, onChange, value, ...restInput},
    meta,
    ...rest
  } = props
  const showError = ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) && meta.touched

  return (
    <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale={'it'}>
      <DatePicker
        {...rest}
        name={name}
        helperText={showError ? meta.error || meta.submitError : undefined}
        error={showError}
        inputProps={restInput}
        onChange={onChange}
        format='DD-MM-YYYY'
        clearable
        value={value === '' ? null : value}
      />
    </MuiPickersUtilsProvider>
  )
}

DatePickerWrapper.propTypes = {
  input: PropTypes.any,
  meta: PropTypes.any
}

export default DatePickerWrapper