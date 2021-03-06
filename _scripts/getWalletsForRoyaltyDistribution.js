require('dotenv').config()
const fs = require('fs')
const assetsFile = require('../data/assets/fox')
const getWalletAddressOfAsset = require('../functions/blockfrost/getWalletAddressOfAsset')
const getStakeKeyFromWalletAddress = require('../functions/blockfrost/getStakeKeyFromWalletAddress')
const { BAD_FOX_WALLET, JPG_STORE_WALLET, CNFT_IO_WALLET, EPOCH_ART_WALLET } = require('../constants/addresses')

const ROYALTY_SHARE = 56000

const EXCLUDE_ADDRESSES = [BAD_FOX_WALLET, JPG_STORE_WALLET, CNFT_IO_WALLET, EPOCH_ART_WALLET]

const run = async () => {
  const assets = assetsFile.assets
  const stakeAddresses = {}
  let totalFoxCount = 0

  try {
    for (let idx = 0; idx < assets.length; idx++) {
      const {
        asset,
        onchain_metadata: { attributes },
      } = assets[idx]

      console.log('\nProcessing index:', idx)
      console.log('Asset:', asset)

      const { address } = await getWalletAddressOfAsset(asset)

      if (EXCLUDE_ADDRESSES.includes(address)) {
        console.log('This wallet address is excluded!')
      } else {
        const isCrypto = attributes.Mouth === '(F) Crypto'
        const isCashBag = attributes.Mouth === '(M) Cash Bag'

        let stakeKey = ''
        const existingStakeKeyArr = Object.entries(stakeAddresses).filter(([sKey, obj]) =>
          obj.addresses.includes(address)
        )

        if (existingStakeKeyArr.length) {
          stakeKey = existingStakeKeyArr[0][0]
        } else {
          stakeKey = await getStakeKeyFromWalletAddress(address)
        }

        if (stakeAddresses[stakeKey]) {
          const addressAlreadyExists = stakeAddresses[stakeKey].addresses.find((str) => str === address)

          if (!addressAlreadyExists) {
            stakeAddresses[stakeKey].addresses.push(address)
          }

          stakeAddresses[stakeKey].foxCount += 1
          stakeAddresses[stakeKey].cryptoCount += isCrypto ? 1 : 0
          stakeAddresses[stakeKey].cashBagCount += isCashBag ? 1 : 0
        } else {
          stakeAddresses[stakeKey] = {
            addresses: [address],
            foxCount: 1,
            cryptoCount: isCrypto ? 1 : 0,
            cashBagCount: isCashBag ? 1 : 0,
          }
        }

        totalFoxCount++
        console.log('Stake key:', stakeKey, stakeAddresses[stakeKey])
      }
    }

    const adaPerFox = ROYALTY_SHARE / totalFoxCount

    const wallets = Object.entries(stakeAddresses).map(([sKey, obj]) => {
      const adaForFoxes = obj.foxCount * adaPerFox
      const adaForTraits = obj.cryptoCount * 10 + obj.cashBagCount * 10

      return {
        satekKey: sKey,
        address: obj.addresses,
        counts: {
          foxCount: obj.foxCount,
          cryptoCount: obj.cryptoCount,
          cashBagCount: obj.cashBagCount,
        },
        payout: {
          adaForFoxes,
          adaForTraits,
          total: adaForFoxes + adaForTraits,
        },
      }
    })

    fs.writeFileSync(
      './data/royalties.json',
      JSON.stringify({
        _wen: Date.now(),
        totalFoxCount,
        wallets,
      }),
      'utf8'
    )

    console.log('\nDone!')
  } catch (error) {
    console.error(error)
  }
}

run()
