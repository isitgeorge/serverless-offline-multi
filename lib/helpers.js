const { getInstalledPath } = require('get-installed-path')

const determineArguments = (args) => {
    return new Promise((resolve, reject) => {

        if (args && args.directory) {
            if (args.port) {
                if (typeof args.directory === 'string' && typeof args.port === 'number') {
                    resolve([{
                        directory: args.directory,
                        port: args.port
                    }])
                } else if (Array.isArray(args.directory) && Array.isArray(args.port)) {
                    if (args.directory.length === args.port.length) {
                        const mappedArgs = args.directory.map((dir, index) => {
                            const port = args.port[index]
                            if (typeof dir !== 'string') {
                                reject('Directory argument missing or not a string')
                            }

                            if (typeof port !== 'number') {
                                reject('Port argument missing or not a number')
                            }

                            return {
                                directory: dir,
                                port: port
                            }
                        })

                        resolve(mappedArgs)
                    } else {
                        reject('Amount of directory and port arguments must be equal')
                    }
                } else {
                    reject('Amount of directory and port arguments must be equal')
                }
            } else {
                reject('Port argument missing')
            }
        } else {
            reject('Directory argument missing')
        }
    }).catch(err => {
        throw new Error(`ArgumentValidationError: ${err}`)
    })
}

exports.determineArguments = determineArguments

const prefixColors = [
    'red',
    'blue',
    'green',
    'yellow',
    'magenta',
    'cyan',
    'white',
    'gray'
]

exports.prefixColors = prefixColors

const isServerlessInstalled = () => {
    return getInstalledPath('serverless').then((path) => {
        return true
    }).catch(err => {
        return false
    })
}

exports.isServerlessInstalled = isServerlessInstalled