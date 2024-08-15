import { NextApiHandler } from 'next'

import { prisma } from '@/utils/client'

const postDeleteApiHandler: NextApiHandler = async (req, res) => {
    const { query } = req; // Extract the query object from the request
    const { id } = query;

	try {
		if (req.method === 'DELETE') {
			if(id) {
				await prisma.catatan.delete({
					where: {
						id: `${id}`
					}
				})

				return res.status(200).json({
					success: true,
					message: 'success deleting note',
				})
			}
		}

        if (req.method === 'PUT') {
            const { title, description } = req.body
            const catatan = await prisma.catatan.update({
              where: {
                id: `${id}`, 
              },
              data: {
                title,
                body: description
              }
            });
      
            if (!catatan) {
              return res.status(404).json({ message: 'Post not found' });
            }
      
            res.status(200).json(catatan);
        }

        if (req.method === 'GET') {
              const catatan = await prisma.catatan.findUnique({
                where: {
                  id: `${id}`, 
                },
              });
        
              if (!catatan) {
                return res.status(404).json({ message: 'Post not found' });
              }
        
              res.status(200).json(catatan);
          } else {
            res.status(405).json({ message: 'Method not allowed' });
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

export default postDeleteApiHandler
