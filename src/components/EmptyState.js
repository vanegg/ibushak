import React, { Component } from 'react'

export default class EmptyState extends Component {
  render () {
    return (
      <div className="c-empty">
        <img src="/assets/no-sales.png" className="c-empty__image" alt=""/>
        <h3>{this.props.title}</h3>
        <p>{this.props.text}</p>
      </div>
    )
  }
}
