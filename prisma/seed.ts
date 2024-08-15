import { faker } from '@faker-js/faker'

import { prisma } from '../src/utils/client'
import config from '../src/config/default'

/**
 *
 * @param length dummy data length
 * @returns created/failed response
 */
const feedSomeData = async (length: number) => {
	try {
		const createRandomCatatan = () => {
			return {
				title: faker.lorem.lines(1),
				body: faker.lorem.paragraph(1)
			} as unknown as any
		}

		// create users
		await prisma.catatan.createMany({
			data: faker.helpers.multiple(createRandomCatatan, { count: length }),
			skipDuplicates: true,
		})

		console.log('🚀 ~ file: seed.ts:45 ~ data feeded successfully.')
	} catch (error) {
		console.log('🚀 ~ file: seed.ts:44 ~ feedSomeData ~ error:', error)
	}
}

feedSomeData(config.dummyDataLength)
