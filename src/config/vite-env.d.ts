interface ImportMetaEnv {
  readonly VITE_INFURA_API_KEY: string
  readonly VITE_WALLET_CONNECT_ID: string
  readonly VITE_MAIDS_CONTRACT_ADDRESS: string
  readonly VITE_MARKET_PROXY_CONTRACT_ADDRESS: string
  readonly VITE_MAIDS_ITEM_CONTRACT_ADDRESS: string
  readonly VITE_MAIDS_VOTING_CONTRACT_ADDRESS: string
  readonly VITE_NETWORK: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
