import basicPromise from '../utils/BasicPromise'

class Request {
  get(url, queryParams) {
    let query = this._serialize(queryParams)
    let urlWithParams = url + "?" + query
    return this._fetch(urlWithParams, { method: 'GET' })
  }

  _parseLinks (headers) {
    let linksObject = {}
    let links = headers && headers.get('link')
    if (links) {
      links.split(', ').forEach((l) => {
        let link = l.split('; ')
        linksObject[link[1].replace('rel="', '').replace('"', '')] = link[0].replace(/[<>]/gi, '')
      })
    }
    return linksObject
  }
  _serialize = function (obj) {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  }

  async parseResponse (response) {
    try {
      let contentType = response.headers.get('Content-Type')
      contentType = contentType ? contentType.toLowerCase() : ''
      if (contentType.indexOf('application/json') === 0) {
        return await response.json()
      } else {
        return JSON.parse(await response.text())
      }
    } catch (error) {
      return null
    }
  }

  async _checkStatus (response) {
    if (response.ok) {
      return {
        status: response.status,
        headers: response.headers,
        links: this._parseLinks(response.headers),
        body: await this.parseResponse(response)
      }
    } else {
      return basicPromise(null, {
        status: response.status,
        ok: response.ok,
        body: await this.parseResponse(response)
      })
    }
  }

  async _fetch (url, { method = 'GET', body = {}, headers = {}  }) {
    try {
      headers['Content-Type'] = 'application/json'

      let params = {
        method: method,
        headers: headers,
        body: JSON.stringify(body)
      }

      if (method === 'GET') {
        delete params.body
      }

      let result = await this._timeout(60, fetch(url, params))

      return this._checkStatus(result)
    } catch (error) {
      return error
    }
  }

  _timeout (sec, promise) {
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error('ERR_TIMEOUT'))
      }, sec * 1000)
      promise.then((res) => {
        clearTimeout(timeoutId)
        resolve(res)
      },
      (err) => {
        clearTimeout(timeoutId)
        reject(err)
      })
    })
  }
}

let request = null

if (!request) {
  request = new Request()
}

export default request
