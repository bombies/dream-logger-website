import {ApiRoute, authenticated} from "@/app/api/utils/api-utils";
import dreamReportsService from "@/app/api/me/dreams/reports/dream-reports-service";

export const GET: ApiRoute = async (req) => (
    authenticated((session) => (
        dreamReportsService.getDreamsAggregate(session, new URL(req.url).searchParams)
    ))
)