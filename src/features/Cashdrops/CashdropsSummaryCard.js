import { formatCurrency } from "../../utils/stringUtl";

const CashdropsSummaryCard = ({ user }) => {
    let navigate = useNavigate();
    const cashdrops = useSelector(state => state.common.cashdrops.cashdropRounds ?? []);
    const isCashDrop = true;
    let totalCashdropAmount = 0;

    cashdrops.forEach(drop => {
        totalCashdropAmount += Number(drop.pooledAmount);
    });

    const checkAvailableCashDrop = () => {
        logToAnalytics('cashdrop_tab_clicked', {
            'username': user.username,
            'phone_number': user.phone_number,
            'email': user.email
        });
        navigate('/cash-drop')
    }

    const doNothing = () => {

    }

    return (
        <div className="top-leaders-container" style={{ opacity: !isCashDrop ? 0.4 : 1 }} onClick={isCashDrop ? checkAvailableCashDrop : doNothing}>
            <div className="top-leaders-sub-container">
                <div className="image-avatar">
                    <img
                        src="/images/locker-dynamic-color.png"
                        alt='crown'
                        className='avatar'
                    />
                </div>
                <div className="leaders-header-container">
                    <p className="top-leaders-header">Cash drop</p>
                    {isCashDrop ?
                        <p className="top-leaders-headerii">NGN {formatCurrency(totalCashdropAmount)}</p>
                        :
                        <p className="top-leaders-headeri">Lucky winners win the pools</p>
                    }
                </div>
            </div>
            {isCashDrop ?
                <div className="live-container">
                    <img src='/images/star.png' alt='start' className='star' />
                    <span className="live-text">Live Now</span>
                </div>
                :
                <IoChevronForwardOutline size={22} className='icon' color="#1C453B" />
            }

        </div>
    )
}

export default CashdropsSummaryCard;