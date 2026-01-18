import { db } from '$lib/server/db';
import { user, pricingPackage } from '$lib/server/db/schema';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { eq, desc } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals }) => {
    if (!locals.user || locals.user.role !== 'admin') {
        throw redirect(302, '/auth');
    }

    const allUsers = await db.select().from(user).orderBy(desc(user.id));
    const allPackages = await db.select().from(pricingPackage).orderBy(desc(pricingPackage.createdAt));

    return {
        users: allUsers,
        packages: allPackages
    };
};

export const actions: Actions = {
    updateRole: async ({ request, locals }) => {
        if (!locals.user || locals.user.role !== 'admin') throw error(403);
        const formData = await request.formData();
        const userId = formData.get('userId') as string;
        const newRole = formData.get('role') as string;

        await db.update(user).set({ role: newRole }).where(eq(user.id, userId));
        return { success: true };
    },

    deleteUser: async ({ request, locals }) => {
        if (!locals.user || locals.user.role !== 'admin') throw error(403);
        const formData = await request.formData();
        const userId = formData.get('userId') as string;

        if (userId === locals.user.id) return error(400, "Cannot delete yourself");

        await db.delete(user).where(eq(user.id, userId));
        return { success: true };
    },

    savePackage: async ({ request, locals }) => {
        if (!locals.user || locals.user.role !== 'admin') throw error(403);
        const formData = await request.formData();
        const id = formData.get('id') as string || crypto.randomUUID();
        const name = formData.get('name') as string;
        const description = formData.get('description') as string;
        const monthlyPrice = parseInt(formData.get('monthlyPrice') as string);
        const annualPrice = parseInt(formData.get('annualPrice') as string);
        const features = formData.get('features') as string;
        const isPopular = formData.get('isPopular') === 'on' ? 1 : 0;

        const packageData = {
            id,
            name,
            description,
            monthlyPrice,
            annualPrice,
            features,
            isPopular,
            updatedAt: new Date()
        };

        const [existing] = await db.select().from(pricingPackage).where(eq(pricingPackage.id, id)).limit(1);

        if (existing) {
            await db.update(pricingPackage).set(packageData).where(eq(pricingPackage.id, id));
        } else {
            await db.insert(pricingPackage).values({
                ...packageData,
                createdAt: new Date()
            });
        }

        return { success: true };
    },

    deletePackage: async ({ request, locals }) => {
        if (!locals.user || locals.user.role !== 'admin') throw error(403);
        const formData = await request.formData();
        const id = formData.get('id') as string;

        await db.delete(pricingPackage).where(eq(pricingPackage.id, id));
        return { success: true };
    }
};
