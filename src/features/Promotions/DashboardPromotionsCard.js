import { IoChevronForwardOutline } from "react-icons/io5";
import DashboardFeatureCard from "../../components/DashboardFeatureCard";
import { useNavigate } from "react-router-dom";

export default function DashboardPromotionsCard() {

    const navigate = useNavigate();

    return <DashboardFeatureCard
        iconUrl="/images/gift-dynamic.png"
        iconBackgroundColor="#EBFAED"
        title="Promotions"
        text="Daily & weekly cashbag"
        action={() => navigate('/promotions')}
        actionComponent={<IoChevronForwardOutline size={22} className='icon' color="#1C453B" />}
    />;
}