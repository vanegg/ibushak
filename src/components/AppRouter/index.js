import React from 'react'
import { Switch, BrowserRouter, Route } from 'react-router-dom'
import ROUTES from '../../routes'

function createRoutes () {
  return ROUTES.map((route, i) => {
    let Router = Route
    return (<Router
      key={i}
      exact
      path={route.route}
      render={(props) => (<route.component {...props} />)}
    />
    )
  })
}

export default class AppRouter extends React.Component {
  render () {
    return (
      <BrowserRouter>
        <Switch>
          { createRoutes() }
        </Switch>
      </BrowserRouter>
    )
  }
}
