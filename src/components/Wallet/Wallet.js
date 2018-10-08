import React from 'react'
import requireAuth from '../requireAuth'

const Wallet = () => (
  <div>
    Wallet Component
  </div>
)

export default requireAuth(Wallet)
