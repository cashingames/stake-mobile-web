import React from 'react'
import { formatCurrency } from '../../utils/stringUtl';
import './UserWalletBalance.scss'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

function UserWalletBalance({ user, boost, balanceName, setBalanceName, depositBalance }) {


  const balanceAccounts = [
    {
      key: 1,
      value: `Deposit (NGN ${formatCurrency(depositBalance)})`,
      disabled: depositBalance < boost.currency_value,
    },
    {
      key: 2,
      value: `Bonus (NGN ${formatCurrency(user.bonusBalance)})`,
      disabled: user.bonusBalance < boost.currency_value
    }
  ]
  return (
    <div className="balances-container">
      <span className="balance-label">Purchase boost from</span>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label" style={{ fontFamily: 'sansation-regular', color: '#072169', fontSize: '0.92rem', }}>Select Wallet</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={balanceName}
          label="Select Wallet"
          onChange={(e) => setBalanceName(e.target.value)}
          sx={{
            height: ' 3.5rem',
            borderRadius: '14px',
            fontSize: '0.95rem',
            background: '#FFF',
            border: '0.1px solid #D9D9D9',
            outline: 0,
            fontFamily: 'sansation-regular',
            color: '#072169',
          }}
        >
          {balanceAccounts && balanceAccounts.map((balanceAccount, i) => {
            return (
              <MenuItem key={balanceAccount.key} value={balanceAccount.key} disabled={balanceAccount.disabled}
                style={{ color: '#072169', fontFamily: 'sansation-regular' }}>{balanceAccount.value}</MenuItem>
            )
          }
          )}
        </Select>
      </FormControl>
    </div>
  )
}

export default UserWalletBalance