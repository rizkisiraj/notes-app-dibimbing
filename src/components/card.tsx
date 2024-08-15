'use client'

import { formatDate } from "@/utils/helper"
import { DeleteIcon } from "@chakra-ui/icons"
import { Box, Flex, Heading, IconButton, Link, Text } from "@chakra-ui/react"

export default function Card({id, title, body, createdAt, handleDeleteButton}: {id:string, title: string, body: string, createdAt: string, handleDeleteButton: (id: any) => {}}) {
    return (
        <Box className='flex flex-col justify-between' rounded="10" bgColor="blue.200" height="200px" padding="2">
            <Box>
            <Flex justifyContent="space-between" marginBottom="2" gap={3}>
                <Link href={`/notes/${id}`} size="lg" noOfLines={1}>
                <Heading as="p" size="lg">{title}</Heading></Link>
                <IconButton
                    isRound={true}
                    variant="solid"
                    colorScheme='red'
                    aria-label='Done'
                    fontSize='16px'
                    icon={<DeleteIcon />}
                    onClick={() => {
                       handleDeleteButton(id)
                    }}
                />
            </Flex>
            <Text noOfLines={4}>{body}</Text>
            </Box>
            <Text size="md" color="gray.600">{formatDate(createdAt)}</Text>
        </Box>
    )
}