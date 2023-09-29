import { useNavigate } from "react-router-dom";
import DashboardFeatureCard from "../../components/DashboardFeatureCard";
import CashdropActionButton from "./CashdropActionButton";
import { selectTotalCashdrop, useGetCashdropsQuery } from "./cashdropSlice";
import { useSelector } from "react-redux";
import MoneyDisplay from "../../components/Finance/MoneyDisplay";

export default function DashboardCashdropCard() {
    const navigate = useNavigate();

    useGetCashdropsQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });

    const total = useSelector(selectTotalCashdrop);

    return <DashboardFeatureCard
        iconUrl={"/images/locker-dynamic-color.png"}
        iconBackgroundColor="#FEECE7"
        title="Cashdrop"
        text={<MoneyDisplay amount={total} />}
        action={() => navigate('/cashdrops')}
        actionComponent={<CashdropActionButton />}
    />;
}

