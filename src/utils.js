import PropTypes from 'prop-types'
import {getContext} from 'recompose'
import sdk from 'stellar-sdk'

const keypairReadable = keypair => {
  return {publicKey: keypair.publicKey(), secret: keypair.secret()}
}

const isSignedIn = ({signer}) => signer && sdk.StrKey.isValidEd25519SecretSeed(signer)

const storageInit = () => {
  let storage
  if (typeof localStorage === 'undefined' || localStorage === null) {
    const tmpdir = require('os').tmpdir
    const join = require('path').join
    const storagePath = join(tmpdir(), 'steexp')
    const LocalStorage = require('node-localstorage').LocalStorage
    storage = new LocalStorage(storagePath)
  } else {
    storage = localStorage
  }
  return storage
}

// @see App.js which puts this stellar server handle on the context
const withServer = getContext({server: PropTypes.object})
const withSigner = getContext({signer: PropTypes.string})

export {keypairReadable, isSignedIn, storageInit, withServer, withSigner}
