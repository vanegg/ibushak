import React, { Component } from 'react'
import AppRouter from './components/AppRouter'
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css'
import moment from 'moment'

moment.locale('es')

class App extends Component {
  render () {
    return (
      <AppRouter />
    )
  }
}

export default App
