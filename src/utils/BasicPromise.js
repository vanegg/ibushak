export default function BasicPromise (data, error = null) {
  return new Promise((resolve, reject) => {
    if (error) {
      reject(error)
    } else {
      resolve(data)
    }
  })
}
