import { db } from '$lib/server/db';
import { pricingPackage } from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';
import { asc } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
    const packages = await db.select().from(pricingPackage).orderBy(asc(pricingPackage.annualPrice));
    return {
        packages
    };
};
