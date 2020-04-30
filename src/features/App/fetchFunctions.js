import request from 'api/request'
import { ML_ITEMS } from 'api/constants'
import { deserialise } from 'kitsu-core'

export const _fetchData = async function (siteId, params, offset = null, ) {
  let queryParams = {...params}
  if (offset) {
    queryParams['offset'] = offset
  }
  try {
    let response = await request.get(ML_ITEMS(siteId), queryParams)
    let body = await deserialise(response.body)
    if (body) {
      let results = body.results
      if (results) {
        let formatData = await _format(results)
        if (this.state.data.length > 0) {
          this.setState({
            data: this.state.data.concat(formatData)
          })
        } else {
          this.setState({
            data: formatData
          })
        }
      }
    }
  } catch (error) {
    console.log(error)
  }
}

async function _format(results) {
  for (let el in results) {
    let brand = ''
    if (results[el].attributes) {
      brand = results[el].attributes.filter(function (attr) {
        return attr.id === 'BRAND';
      })[0]
      results[el].brand = brand ? brand.value_name : 'NA'
    }
  }
  return results
}

