const listHelper = require('../utils/list_helper')

// Defining test inputs for the function can be done like this:
describe('total likes', () => {
	const listWithZeroBlog = []


	test('of empty list is zero', () => {
		const result = listHelper.totalLikes(listWithZeroBlog)
		expect(result).toBe(0)
	})

