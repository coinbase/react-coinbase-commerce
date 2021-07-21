opaque type OrderCode = string;
type Network = 'bitcoin' | 'bitcoincash' | 'ethereum' | 'litecoin' | 'dogecoin'
type PricingType = 'fixed_price' | 'no_price'
type PaymentStatus = 'NEW' | 'PENDING' | 'CONFIRMED' | 'FAILED'
type FiatCurrency = string
type CryptoCurrency = string

type CryptoMoney = {|
  amount: string,
  currency: CryptoCurrency
|}
type FiatMoney = {|
  amount: string,
  currency: FiatCurrency,
|}
type ChargePricing = {|
  local: FiatMoney,
  bitcoin: ?CryptoMoney,
  bitcoincash: ?CryptoMoney,
  ethereum: ?CryptoMoney,
  litecoin: ?CryptoMoney,
  dogecoin: ?CryptoMoney
|}


export type Payment = {|
  network: Network,
  transactionId: string,
  status: PaymentStatus,
  value: {
    crypto: CryptoMoney,
    local: FiatMoney
  },
  block: {
    height?: number,
    hash?: string,
    confirmations: number,
    confirmationsRequired: number
  }
|}
type ChargeState = {|
  status: ChargeStatus,
  context: ?ChargeContext,
  time: string,
  payment?: {
    network: Network,
    transactionId: string
  }
|}


export type Charge = {|
  code: OrderCode,

  createdAt: string,
  confirmedAt?: string,
  expiresAt: string,

  addresses: { [Network]: string },
  pricingType: PricingType,
  pricing?: ChargePricing,
  payments: Array<Payment>,
  timeline: Array<ChargeState>,

  name?: string,
  description?: string,
  logoUrl?: string,

  checkout?: {| id: string |}, // shallow

  redirectUrl?: string,
  thirdPartyProvider?: string
|}

export type MessageData = {
  event: 'charge:created' | 'charge:failed',
  charge: Charge
}
