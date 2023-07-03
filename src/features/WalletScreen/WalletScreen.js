import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './WalletScreen.scss';
import AnonymousRouteHeader from '../../components/AnonymousRouteHeader/AnonymousRouteHeader';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { formatCurrency } from '../../utils/stringUtl';
import { Spinner } from 'react-activity';
import { IoChevronForwardOutline, IoEllipse } from 'react-icons/io5';
import { IoRemove } from 'react-icons/io5';
import { IoAdd } from 'react-icons/io5';
import { getUser } from '../Auth/AuthSlice';
import { fetchUserTransactions } from '../CommonSlice';

function WalletScreen() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const [loading, setLoading] = useState(true)
  const [mainWalletActive, setMainWalletActive] = useState(true);
  const transactions = useSelector(state => state.common.userTransactions);
  // console.log(transactions)
  // const transactions = {
  //   bonusTransactions: [
  //     {
  //       "id": 1,
  //       "type": 'DEBIT',
  //       "amount": '500',
  //       "description": "Trivia challenge"
  //     },
  //     {
  //       "id": 2,
  //       "type": 'CREDIT',
  //       "amount": '700',
  //       "description": "Trivia challenge"
  //     }

  //   ],
  //   mainTransactions: [
  //     {
  //       "id": 1,
  //       "type": 'DEBIT',
  //       "amount": '200',
  //       "description": "Trivia challenge"
  //     },
  //     {
  //       "id": 2,
  //       "type": 'CREDIT',
  //       "amount": '800',
  //       "description": "Trivia challenge"
  //     }
  //   ]
  // }
  const [bonusWalletActive, setBonusWalletActive] = useState(false);


  const toggleMainWallet = () => {
    setBonusWalletActive(false);
    setMainWalletActive(true);
  }

  const toggleBonusWallet = () => {
    setMainWalletActive(false);
    setBonusWalletActive(true);
  }
  useEffect(() => {
    dispatch(getUser());
    dispatch(fetchUserTransactions()).then(() => setLoading(false));
  }, [dispatch]);

  return (
    <div className='wallet-screen-container'>
      <AnonymousRouteHeader title='Wallet' styleProp='password-header' noClose={true} />
      <WalletsButtton toggleBonusWallet={toggleBonusWallet} toggleMainWallet={toggleMainWallet}
        mainWalletActive={mainWalletActive} bonusWalletActive={bonusWalletActive} />
      <WalletBalanceDetails balance={user.walletBalance} bonusBalance={user.bonusBalance} bonusWalletActive={bonusWalletActive}
        mainWalletActive={mainWalletActive} />
      <TransactionsContainer
        loading={loading}
        transactions={transactions}
        mainWalletActive={mainWalletActive}
        bonusWalletActive={bonusWalletActive}

      />
    </div>
  )
}

const WalletsButtton = ({ toggleMainWallet, toggleBonusWallet, mainWalletActive, bonusWalletActive }) => {
  return (
    <div className='wallets-buttton'>
      <div className='wallets'>
        <div className={mainWalletActive ? 'wallet-button' : 'inactive-wallet-button'} onClick={toggleMainWallet}>
          <p className={mainWalletActive ? 'wallet-text' : 'inactive-wallet-text'}>Main wallet</p>
        </div>
        <div className={bonusWalletActive ? 'wallet-button' : 'inactive-bonus-wallet-text'} onClick={toggleBonusWallet}>
          <p className={bonusWalletActive ? 'wallet-text' : 'inactive-wallet-text'}>Bonus wallet</p>
        </div>
      </div>
    </div>
  )
}

const WalletBalanceDetails = ({ balance, bonusWalletActive, mainWalletActive, bonusBalance }) => {
  let navigate = useNavigate();

  // const [hidden, setHidden] = useState(false);

  return (
    <div className='details-container'>
      {mainWalletActive &&
        <div>
          <div className='total-header'>
            <div className='total-title-container'>
              <img src='/images/wallet-with-cash.png' alt='wallet' className='avatar' />
              <p className='total-title-text'>Total balance</p>
            </div>
            {/* <span onClick={() => setHidden(!hidden)}>{hidden ? <FaEyeSlash color='#072169' /> : <FaEye color='#072169' />}</span> */}
          </div>
          <div className='currency-header'>
            <span className='currency-text'>NGN</span>
            <span className='currency-amount'>{formatCurrency(balance)}</span>

            {/* {hidden ?
              <span className='currency-amount'>***</span> :
              <span className='currency-amount'>{formatCurrency(balance)}</span>
            } */}
          </div>
          <div className='funding-container'>
            <div className='funding-button' onClick={() => navigate('/fund-wallet')}>
              <img src='/images/cash.png' alt='cash' className='avatari' />
              <p className='funding-text'>Deposit</p>
            </div>
            <div className='funding-button' onClick={() => navigate('/withdraw-funds')}>
              <img src='/images/cost-benefit.png' alt='cash' className='avatari' />
              <p className='funding-texti'>Withdrawal</p>
            </div>
          </div>
        </div>
      }
      {bonusWalletActive &&
        <div>
          <div className='total-header'>
            <div className='total-title-container'>
              <img src='/images/sale.png' alt='wallet' className='avatar' />
              <p className='total-title-text'>Bonus balance</p>
            </div>
            {/* <span onClick={() => setHidden(!hidden)}>{hidden ? <FaEyeSlash color='#072169' /> : <FaEye color='#072169' />}</span> */}
          </div>
          <div className='currency-header'>
            <span className='currency-text'>NGN</span>
            <span className='currency-amount'>{formatCurrency(bonusBalance)}</span>

            {/* {hidden ?
              <span className='currency-amount'>***</span> :
              <span className='currency-amount'>{formatCurrency(bonusBalance)}</span>
            } */}
          </div>
        </div>
      }
    </div>
  )
}

const TransactionsContainer = ({ transactions, loading, mainWalletActive, bonusWalletActive }) => {
  let navigate = useNavigate();
  const [allTransactions, setAllTransactions] = useState(true);
  const [creditTransactions, setCreditTransactions] = useState(false);
  const [debitTransactions, setDebitTransactions] = useState(false);

  const toggleAllTransactions = () => {
    setCreditTransactions(false);
    setDebitTransactions(false);
    setAllTransactions(true);
  }

  const toggleCreditTransactions = () => {
    setAllTransactions(false);
    setDebitTransactions(false);
    setCreditTransactions(true);
  }


  const toggleDebitTransactions = () => {
    setAllTransactions(false);
    setCreditTransactions(false);
    setDebitTransactions(true);
  }

  const mainCreditTransactions = () => {
    if (mainWalletActive) {
      return transactions.mainTransactions.filter(x => x.type.toUpperCase() !== "DEBIT");
    }
    return transactions.mainTransactions;
  }

  const mainDebitTransactions = () => {
    if (mainWalletActive) {
      return transactions.mainTransactions.filter(x => x.type.toUpperCase() !== "CREDIT");
    }
    return transactions.mainTransactions;
  }
  const bonusCreditTransactions = () => {
    if (bonusWalletActive) {
      return transactions.bonusTransactions.filter(x => x.type.toUpperCase() !== "DEBIT");
    }
    return transactions.bonusTransactions;
  }
  const bonusDebitTransactions = () => {
    if (bonusWalletActive) {
      return transactions.bonusTransactions.filter(x => x.type.toUpperCase() !== "CREDIT");
    }
    return transactions.bonusTransactions;
  }

  return (
    <div className='transactions-container'>
      <p className='transactions-header'>Transaction History</p>
      <div className='wallets-button'>
        <div className='wallets'>
          <div className={allTransactions ? 'wallet-button' : 'inactive-wallet-button'} onClick={toggleAllTransactions}>
            <p className={allTransactions ? 'wallet-text' : 'inactive-wallet-texta'}>All</p>
          </div>
          <div className={creditTransactions ? 'wallet-button' : 'inactive-wallet-button'} onClick={toggleCreditTransactions}>
            <p className={creditTransactions ? 'wallet-text' : 'inactive-wallet-texti'}>Credit</p>
          </div>
          <div className={debitTransactions ? 'wallet-button' : 'inactive-wallet-button'} onClick={toggleDebitTransactions}>
            <p className={debitTransactions ? 'wallet-text' : 'inactive-wallet-texti'}>Debit</p>
          </div>
        </div>
      </div>
      {loading ?
        <Spinner
          color='#072169'
          size={10}
        />
        :
        <>
          <div style={
                { backgroundImage: "url(/images/coins-background.png)" }
            } className='transactions-background'>
            {mainWalletActive && allTransactions &&
              <>
                {
                  transactions.mainTransactions.length > 0 ?
                    <div className='transactionsSubContainer'>
                      {
                        transactions.mainTransactions.map((transaction, i) => <FundTransactions key={i} transaction={transaction}
                        />)
                      }
                      <button className='button-container' onClick={() => navigate('/transactions')}>
                        <span className='buttonText'>View more</span>
                        <IoChevronForwardOutline size={20} color='#fff' className='icon' />
                      </button>
                    </div>
                    :
                    <div className='noTransactionContainer'>
                      <p className='noTransaction'>No transaction records</p>
                    </div>
                }
              </>
            }
            {mainWalletActive && creditTransactions &&
              <>
                {
                  mainCreditTransactions().length > 0 ?
                    <div className='transactionsSubContainer'>
                      {
                        mainCreditTransactions().map((transaction, i) => <FundTransactions key={i} transaction={transaction}
                        />)
                      }
                      <button className='button-container' onClick={() => navigate('/transactions')}>
                        <span className='buttonText'>View more</span>
                        <IoChevronForwardOutline size={20} color='#fff' className='icon' />
                      </button>
                    </div>
                    :
                    <div className='noTransactionContainer'>
                      <p className='noTransaction'>No transaction records</p>
                    </div>
                }
              </>
            }
            {mainWalletActive && debitTransactions &&
              <>
                {
                  mainDebitTransactions().length > 0 ?
                    <div className='transactionsSubContainer'>
                      {
                        mainDebitTransactions().map((transaction, i) => <FundTransactions key={i} transaction={transaction}
                        />)
                      }
                      <button className='button-container' onClick={() => navigate('/transactions')}>
                        <span className='buttonText'>View more</span>
                        <IoChevronForwardOutline size={20} color='#fff' className='icon' />
                      </button>
                    </div>
                    :
                    <div className='noTransactionContainer'>
                      <p className='noTransaction'>No transaction records</p>
                    </div>
                }
              </>
            }
            {bonusWalletActive && allTransactions &&
              <>
                {
                  transactions.bonusTransactions.length > 0 ?
                    <div className='transactionsSubContainer'>
                      {
                        transactions.bonusTransactions.map((transaction, i) => <FundTransactions key={i} transaction={transaction}
                        />)
                      }
                      <button className='button-container' onClick={() => navigate('/transactions')}>
                        <span className='buttonText'>View more</span>
                        <IoChevronForwardOutline size={20} color='#fff' className='icon' />
                      </button>
                    </div>
                    :
                    <div className='noTransactionContainer'>
                      <p className='noTransaction'>No transaction records</p>
                    </div>
                }
              </>
            }
            {bonusWalletActive && creditTransactions &&
              <>
                {
                  bonusCreditTransactions().length > 0 ?
                    <div className='transactionsSubContainer'>
                      {
                        bonusCreditTransactions().map((transaction, i) => <FundTransactions key={i} transaction={transaction}
                        />)
                      }
                      <button className='button-container' onClick={() => navigate('/transactions')}>
                        <span className='buttonText'>View more</span>
                        <IoChevronForwardOutline size={20} color='#fff' className='icon' />
                      </button>
                    </div>
                    :
                    <div className='noTransactionContainer'>
                      <p className='noTransaction'>No transaction records</p>
                    </div>
                }
              </>
            }
            {bonusWalletActive && debitTransactions &&
              <>
                {
                  bonusDebitTransactions().length > 0 ?
                    <div className='transactionsSubContainer'>
                      {
                        bonusDebitTransactions().map((transaction, i) => <FundTransactions key={i} transaction={transaction}
                        />)
                      }
                      <button className='button-container' onClick={() => navigate('/transactions')}>
                        <span className='buttonText'>View more</span>
                        <IoChevronForwardOutline size={20} color='#fff' className='icon' />
                      </button>
                    </div>
                    :
                    <div className='noTransactionContainer'>
                      <p className='noTransaction'>No transaction records</p>
                    </div>
                }
              </>
            }
          </div>
        </>
      }
    </div>
  )
}

const FundTransactions = ({ transaction }) => {
  return (
    <div className='transactionDetails'>
      <div className='narationDetails'>
        <IoEllipse size={26} color={transaction.type === "DEBIT" ? '#EB2121' : '#00FFA3'} />
        <div className='typeAndDate'>
          <p className='transactionType'>{transaction.description}</p>
          <p className='transactionDate'>{transaction.transactionDate}</p>
        </div>
      </div>
      <div className='amountDetails'>
        {transaction.type === "DEBIT" ?
          <IoRemove size={20} color='072169' />
          :
          <IoAdd size={20} color='072169' />

        }
        <p className='transactionAmount'>&#8358;{formatCurrency(transaction.amount)}</p>
      </div>
    </div>
  )
}



export default WalletScreen