import React, { Component } from 'react'
import StatsByItem from 'components/StatsByItem'
import Empty from 'components/EmptyState'
import Loading from 'components/Loading'
import { _fetchData } from './fetchFunctions'

export default class Ibushak extends Component {
  constructor(props) {
    super(props)
    this.state = this._initialState('MLM')
  }

  _initialState = (siteId = null) => {
    return {
      siteId: siteId,
      data: [],
      loaded: false,
      queryParams: {
        category: 'MLM1051',
        sort: 'price_asc'
      }
    }
  }

  _fetchAll = async () => {
    try {
      await this._fetchData(this.state.siteId, this.state.queryParams)
      this._fetchDataWithOffset()
      this.setState({ loaded: true })
    } catch (err) {
      console.log(err)
      this.setState(this._initialState(this.state.siteId))
      this.setState({loaded: true})
    }
  }

  _fetchDataWithOffset = async (limit = 50) => {
    for (let offset = 0; offset <= 1000; offset = offset + 50) {
      this._fetchData(this.state.siteId, this.state.queryParams, offset)
    }
  }

  _updateFilters = (params) => {
    this.setState({
      loaded: false,
    },() => {
      this._fetchAll()
    })
  }

  componentDidMount() {
    this._fetchData = _fetchData.bind(this)
    if (this.state.siteId) {
      this._fetchAll(true)
    }
  }

  render () {
    return (
      <div className="u-wrapper100 o-layout is-global-stats">
        { !this.state.loaded ? <Loading /> : <>
          { this.state.data.length > 0 ?
            <StatsByItem data={this.state.data} />
          :
            <Empty
              title='No hay productos que mostrar'
              text='No hay productos que mostrar'
            />
          }
        </>}
      </div>
    )
  }
}
