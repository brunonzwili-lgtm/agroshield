'use client'

import { useEffect } from 'react'
import { StellarWalletsKit } from '@creit.tech/stellar-wallets-kit/sdk'
import { defaultModules } from '@creit.tech/stellar-wallets-kit/modules/utils'
import { Networks } from '@stellar/stellar-sdk'

export function StellarWalletProvider() {
  useEffect(() => {
    // Initialize Stellar Wallets Kit
    StellarWalletsKit.init({
      modules: defaultModules(),
    })

    // Set network to TESTNET for development
    StellarWalletsKit.setNetwork(Networks.TESTNET)
  }, [])

  return null
}
