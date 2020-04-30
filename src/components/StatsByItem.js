import React, { Component } from 'react'

export default class StatsByItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: this.props.data
    }
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.setState({
        items: this.props.data
    })
    }
  }

  render () {
    return (
      <div className="c-stats__box">
        <h3 className="u-title">Lista con los 1000 artículos de menor precio</h3>
        <table className="o-table--list">
          <thead>
            <tr>
              <th>Meli ID</th>
              <th>Seller ID</th>
              <th>Seller Name</th>
              <th>Marca</th>
              <th>Envío Gratis</th>
              <th>Tipo de Logística</th>
              <th>Lugar de operación del Seller</th>
              <th>Condición del artículo</th>
              <th>Rango de Precios</th>
            </tr>
          </thead>
          <tbody>
          {this.state.items && this.state.items.map(el => (
            <tr>
              <td>{el.id}</td>
              <td>{el.seller.id}</td>
              <td>{el.seller.name}</td>
              <td>{el.brand}</td>
              <td>{el.shipping.free_shipping.toString()}</td>
              <td>{el.shipping.logistic_type}</td>
              <td>{el.seller_address.city.name}, {el.seller_address.state.name}</td>
              <td>{el.condition}</td>
              <td>{el.price}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    )
  }
}
