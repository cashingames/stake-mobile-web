import { useNavigate } from "react-router-dom";
import DashboardFeatureCard from "../../components/DashboardFeatureCard";
import CashdropActionButton from "./CashdropActionButton";
import { formatCurrency } from "../../utils/stringUtl";
import { selectTotalCashdrop, useGetCashdropsQuery } from "./cashdropSlice";
import { useSelector } from "react-redux";


export default function DashboardCashdropCard() {
    const navigate = useNavigate();

    useGetCashdropsQuery(); //trigger the cashdrop query

    const total = useSelector(selectTotalCashdrop);

    return <DashboardFeatureCard
        iconUrl={"/images/locker-dynamic-color.png"}
        title="Cashdrop"
        text={`NGN ${formatCurrency(total)}`}
        action={() => navigate('/cashdrops')}
        actionComponent={<CashdropActionButton />}
    />;
}