// Consistent with Lattice's IV
const AES_IV = [0x6d, 0x79, 0x73, 0x65, 0x63, 0x72, 0x65, 0x74, 0x70, 0x61, 0x73, 0x73, 0x77, 0x6f, 0x72, 0x64]

// Decrypted response lengths will be fixed for any given message type.
// These are defined in the Lattice spec.
// Every decrypted response should have a 65-byte pubkey prefixing it
const decResLengths = {
    finalizePair: 0,   // Only contains the pubkey
    getAddresses: 200, // 20-byte address * 10 max slots
    sign: 1090,          // 1 DER signature for ETH, 10 for BTC (not all are used for BTC)       
}

// Per Lattice spec, all encrypted messages must fit in a buffer of this size.
// The length comes from the largest request/response data type size minus payload metadata
// (12 bytes are stripped from the payload -- another 4 are needed for the checksum)
const ENC_MSG_LEN = 1168;
  
const deviceCodes = {
    'CONNECT': 1,
    'ENCRYPTED_REQUEST': 2,
}

const encReqCodes = {
    'FINALIZE_PAIRING': 0,
    'GET_ADDRESSES': 1,
    'ADD_PERMISSION': 2,
    'SIGN_TRANSACTION': 3,
}

const messageConstants = {
    'NOT_PAIRED': 0x00,
    'PAIRED': 0x01,
}

const currencyCodes = {
    'BTC': 0,
    'ETH': 1,
}

const addressSizes = {
    'BTC': 20,  // 20 byte pubkeyhash
    'ETH': 20,  // 20 byte address not including 0x prefix
}
  
const responseCodes = {
    'SUCCESS': 0x00,
    0x80: 'Invalid Request',
    0x81: 'Unsupported Version',
    0x82: 'Device Busy',
    0x83: 'Timeout Waiting for User',
    0x84: 'Request Declined by User',
    0x85: 'Pairing Failed',
    0x86: 'Pairing is Currently Disabled',
    0x87: 'Automated Signing is Currently Disabled',
    0x88: 'Device Error', 
}
 
const deviceResponses = {
    START_CODE_IDX: 1, // Beginning of 4-byte status code in Lattice response
    START_DATA_IDX: 5, // Beginning of data field for Lattice responses
}

const signingSchema = {
    BTC_TRANSFER: 0,
    ETH_TRANSFER: 1,
    ERC20_TRANSFER: 2
}

const ETH_DATA_MAX_SIZE = 100; // Maximum number of bytes that can go in the data field
const REQUEST_TYPE_BYTE = 0x02; // For all HSM-bound requests
const VERSION_BYTE = 1;

const BASE_URL = 'https://signing.staging-gridpl.us';

module.exports = {
    AES_IV,
    BASE_URL,
    ENC_MSG_LEN,
    addressSizes,
    currencyCodes,
    decResLengths,
    deviceCodes,
    encReqCodes,
    messageConstants,
    responseCodes,
    deviceResponses,
    signingSchema,
    ETH_DATA_MAX_SIZE,
    REQUEST_TYPE_BYTE,
    VERSION_BYTE,
}