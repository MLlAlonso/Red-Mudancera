import { use } from "react";

import PartnerDashboardClient from "./PartnerDashboardClient";

export default function Page({ params }) {
    const resolvedParams = use(params);

    return (
        <PartnerDashboardClient
            slug={resolvedParams.slug}
        />
    );
}