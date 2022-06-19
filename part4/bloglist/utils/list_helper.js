// define a dummy function that receives an array of blog posts as a parameter and always returns the value 1
const dummy = (blogs) => {
	return 1
}

// totalLikes function that receives a list of blog posts as a parameter. The function returns the total sum of likes in all of the blog posts
const totalLikes = (blogs) => {
	if(blogs.length === 0) {
		// totalLikes of empty list is zero
		return 0
	}
	else if(blogs.length === 1) {
		// when list has only one blog, equals the likes of that 
		// console.log('when list has only one blog totalLikes is ', blogs[0].likes)
		return blogs[0].likes
	}
	else {
		// totalLikes of a bigger list is calculated right
		// first map the likes from all blogs into separate array
		const likes = blogs.map(blog => blog.likes)
		// console.log('array of likes', likes)

		// use the reduce function to calculate the sum of 
		// const reducer = (sum, likes) => {
		// 		return sum + likes
		// }

		// return likes.reduce(reducer, 0)

		// use a forEach method to find the sum of likes array
		let sum = 0

		likes.forEach(like => {
				sum += like
				// console.log(sum)
			});

		return sum
	}
}

// favoriteBlog function that receives a list of blogs as a parameter. The function finds out which blog has most likes.
const favoriteBlog = (blogs) => {
	// first map the likes from all blogs into separate array
	const likes = blogs.map(blog => blog.likes)
	// console.log('array of likes', likes)

	// find the index of the max value in likes array spread so that Math.max finds max out of entire array instead of one value of array
	const mostLikesIndex = likes.indexOf(Math.max(...likes))
	// console.log(mostLikesIndex)

	// return the blog with the most likes in following format
	const blog = {
		title: blogs[mostLikesIndex].title,
		author: blogs[mostLikesIndex].author,
		likes: blogs[mostLikesIndex].likes
	}
	
	return blog
}
