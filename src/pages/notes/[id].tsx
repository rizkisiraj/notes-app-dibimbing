'use client'

import { Button, Flex, FormControl, FormLabel, Heading, Input, Text, useDisclosure, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import NextLink from 'next/link'
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
  } from '@chakra-ui/react'
import { useRef, useState } from 'react';

export default function NotePage() {
  const toast = useToast()
  const router = useRouter();
  const { id } = router.query;
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")

    const initialRef = useRef(null)
	const finalRef = useRef(null)

  const { data, error, isLoading, isError, refetch } = useQuery(
    ['post', id], 
    () => fetchPostById(id), 
  );

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;


  return (
    <main
			className='w-full max-w-5xl mx-auto bg-white min-h-screen p-8'
		>

        <NextLink href='/' passHref>
            <Button variant="link" >Back to homepage</Button>
        </NextLink>
        <Flex justifyContent="space-between">
        <Heading size="xl">{data.title}</Heading>
        <Button onClick={() => {
            setTitle(data.title)
            setDescription(data.body)
            onOpen()
        }} colorScheme='teal'>Edit Note</Button>
        </Flex>
      <Text>{data.body}</Text>
      <Modal
				initialFocusRef={initialRef}
				finalFocusRef={finalRef}
				isOpen={isOpen}
				onClose={onClose}
			>
			<form onSubmit={async (e) => {
					e.preventDefault()

					if(title && description) {
						const response = await fetch(`http://localhost:3000/api/catatan/${id}`, {
							method: 'PUT',
							headers: {
							  'Content-Type': 'application/json', 
							},
							body: JSON.stringify({
							  title: title,
							  description: description, 
							}),
						});
						setTitle("")
						setDescription("")

						onClose()
						toast({
							title: "Berhasil merubah catatan",
							status: "success",
							position: "bottom-left"
						})
						refetch()
						return
					}

					toast({
						title: "Data tidak boleh kosong",
						status: "success",
						position: "bottom-left"
					})
				}}>
			<ModalOverlay />
			<ModalContent>
			<ModalHeader>Create your account</ModalHeader>
			<ModalCloseButton />
			<ModalBody pb={6}>
				<FormControl>
				<FormLabel>Title</FormLabel>
				<Input value={title} onChange={(e) => setTitle(e.currentTarget.value)} ref={initialRef} placeholder='title' />
				</FormControl>

				<FormControl mt={4}>
				<FormLabel>Description</FormLabel>
				<Input value={description} onChange={(e) => setDescription(e.currentTarget.value)} placeholder='description' />
				</FormControl>
			</ModalBody>

			<ModalFooter>
				<Button type='submit' colorScheme='blue' mr={3}>
				Save
				</Button>
				<Button type='button' onClick={onClose}>Cancel</Button>
			</ModalFooter>
			</ModalContent>
			</form>
		</Modal>
    </main>
  );
}

// Fetch function
async function fetchPostById(id: any) {
  const response = await fetch(`http://localhost:3000/api/catatan/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch post');
  }
  return response.json();
}
