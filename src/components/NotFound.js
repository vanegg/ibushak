import React from 'react'

export default class NotFound extends React.Component {
  render () {
    return (
      <div className="c-empty">
        <img src="/assets/no-sales.png" className="c-empty__image" alt=""/>
       <h3>No se encontraron ventas con los filtros que seleccionaste.</h3>
       <p>Intenta buscar con otros valores y rangos de fecha.</p>
      </div>
    )
  }
}
