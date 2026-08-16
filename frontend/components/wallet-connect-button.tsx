'use client'

import { useState } from 'react'
import { StellarWalletsKit } from '@creit.tech/stellar-wallets-kit/sdk'
import { Button } from '@/components/ui/button'
import { Wallet, LogOut } from 'lucide-react'

export function WalletConnectButton() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)

  const connectWallet = async () => {
    try {
      setIsConnecting(true)
      const { address } = await StellarWalletsKit.authModal()
      setWalletAddress(address)
      console.log('Connected wallet:', address)
    } catch (error) {
      console.error('Wallet connection failed:', error)
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = () => {
    setWalletAddress(null)
  }

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`
  }

  return (
    <div className="flex items-center gap-3">
      {walletAddress ? (
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20">
            <Wallet className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">
              {shortenAddress(walletAddress)}
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={disconnectWallet}
            className="border border-primary/20 hover:bg-primary/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Disconnect
          </Button>
        </div>
      ) : (
        <Button
          onClick={connectWallet}
          disabled={isConnecting}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Wallet className="w-4 h-4 mr-2" />
          {isConnecting ? 'Connecting...' : 'Connect Wallet'}
        </Button>
      )}
    </div>
  )
}
