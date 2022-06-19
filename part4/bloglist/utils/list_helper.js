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
