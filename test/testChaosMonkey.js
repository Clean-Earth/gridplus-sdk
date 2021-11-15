// Tests for internal Lattice Wallet Jobs
// NOTE: You must run the following BEFORE executing these tests:
//
// 1. Connect with the same deviceID you specfied in 1:
//
//    env DEVICE_ID='<your_device_id>' npm test
//
// After you do the above, you can run this test with `env DEVICE_ID='<your_device_id>' npm run test-wallet-jobs`
//
// NOTE: It is highly suggested that you set `AUTO_SIGN_DEV_ONLY=1` in the firmware
//        root CMakeLists.txt file (for dev units)
// To run these tests you will need a dev Lattice with: `FEATURE_TEST_RUNNER=1`

const { expect } = require('chai');
const Sdk = require('../index.js');
const crypto = require('crypto');
const question = require('readline-sync').question;
const { help } = require('commander');

//------------------------------------------------------------------------------
// Connect & Pair – HELPER
//------------------------------------------------------------------------------
const CONNECT_AND_PAIR_LATTICE = (
    env     = process.env,
    appName = 'Chaos Monkey [Test]',
    baseUrl = env.baseUrl || 'https://signing.gridpl.us',
    id      = () => env.DEVICE_ID || question('~ Enter Device ID: '),
    passwrd = () => question('~ Enter device password: ', {hideEchoBack: true}),
    secret  = () => question('~ Enter pairing code: ')
) => new Promise((res, rej) => {
    //--------------------------------------------------------------------------
    // Retrieve 'device ID'
    //--------------------------------------------------------------------------
    const deviceId = id()

    //--------------------------------------------------------------------------
    // Retrieve 'private key'
    //--------------------------------------------------------------------------
    const privateKey = (() =>  {
            const password = passwrd()
            const privKeyPreImage = Buffer.concat(
                [
                    Buffer.from(deviceId),
                    Buffer.from(password),
                    Buffer.from(appName)
                ]
            )
            return crypto
                .createHash('sha256')
                .update(privKeyPreImage)
                .digest()
        })()

    //--------------------------------------------------------------------------
    // Create 'client'
    //--------------------------------------------------------------------------
    const clientOpts = {
        appName: appName,
        baseUrl: baseUrl,
        crypto,
        timeout: 180000,
        privKey: privateKey
    }
    const client = new Sdk.Client(clientOpts)

    //--------------------------------------------------------------------------
    // Connect
    //--------------------------------------------------------------------------
    client.connect(deviceId, (err, isPaired) => {
        if (err) {
            rej(err)
        } else {
            if (!isPaired) {
                //--------------------------------------------------------------
                // Retrieve 'secret pairing code'
                //--------------------------------------------------------------
                const pairingCode = secret().toUpperCase()

                //--------------------------------------------------------------
                // Pair
                //--------------------------------------------------------------
                client.pair(pairingCode, (err, isActive) => {
                    if (err || !isActive) {
                        rej(err || new Error("No active wallet found!"))
                    } else {
                        res({ client, deviceId })
                    }
                })
            } else {
                res({ client, deviceId })
            }
        }
    })
})

let lattice /* { client, deviceId } */
let caughtErr = false;

describe('Chaos Monkey', () => {
    before(async () => {
        lattice = await CONNECT_AND_PAIR_LATTICE()
    });

    beforeEach(async () => {
        expect(lattice.deviceId).not.to.be.undefined
        expect(lattice.deviceId).not.to.be.null
        expect(lattice.deviceId).not.to.be.empty
    })

    it('Should 1', () => {
    })
    it('Should 2', () => {
    })
    it('Should 3', () => {
    })
})