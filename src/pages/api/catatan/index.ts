import { NextApiHandler } from 'next'

import { prisma } from '@/utils/client'

const postApiHandler: NextApiHandler = async (req, res) => {
	try {
		if (req.method === 'GET') {
			const catatan = await prisma.catatan.findMany({
				orderBy: {
					createdAt: 'desc',
				},
			})

			if (!catatan || catatan.length === 0) {
				return res.status(404).json({
					success: false,
					message: 'catatan not found',
				})
			}

			return res.status(200).json({
				success: true,
				message: `Total ${catatan.length} posts found`,
				data: catatan,
			})
		}

		if (req.method === 'POST') {
			try {
			  const { title, description } = req.body; // Extract title and description from the request body
		
			  if (!title || !description) {
				return res.status(400).json({ success: false, message: 'Title and description are required' });
			  }
		
			  // Create a new post in the database
			  const newPost = await prisma.catatan.create({
				data: {
				  title,
				  body: description,
				},
			  });
		
			  return res.status(201).json({ success: true, data: newPost });
			} catch (error) {
			  console.error('Error creating post:', error);
			  return res.status(500).json({ success: false, message: 'Internal server error' });
			}
		  }

		return res.status(405).json({
			success: false,
			message: 'Method not allowed',
		})
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: 'Internal server error',
		})
	}
}

export default postApiHandler
