import { Inter } from 'next/font/google'
import { Button, Flex, FormControl, FormLabel, Heading, IconButton, Input, SimpleGrid, Text, useDisclosure, useToast } from '@chakra-ui/react'
import Card from '@/components/card'
import { useQuery } from 'react-query'
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
  } from '@chakra-ui/react'
import { useRef, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
	const { isOpen, onOpen, onClose } = useDisclosure()

	const initialRef = useRef(null)
	const finalRef = useRef(null)
	const toast = useToast()
	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")
	const { isLoading, error, data, refetch, isError } = useQuery('dataCatatan', () =>
		fetch('http://localhost:3000/api/catatan').then(res => {
			if (!res.ok) {
				throw new Error('Network response was not ok');
				return
			}
			return res.json();
		}
		),
		{
			refetchOnWindowFocus: false,
			refetchOnReconnect: false,  
			refetchOnMount: false,       
		  }
	  )

	const handleDeleteButton = async (id: any) => {
		const response = await fetch(`http://localhost:3000/api/catatan/${id}`, {
			method: 'DELETE'
		})

		if(response.ok) {
			toast({
				position: 'bottom-left',
				title: "Berhasil menghapus data",
				status: "success",
				isClosable: true
			})
			refetch()
		}

		

	}

	return (
		<main
			className='w-full max-w-5xl mx-auto bg-white min-h-screen p-8'
		>
			<Flex alignItems="center" justifyContent="space-between">
				<Heading as="h1" size="2xl" >Notes</Heading>
				<Button colorScheme='teal' onClick={onOpen}>Add Note</Button>
			</Flex>
			<SimpleGrid columns={3} spacing={10} marginTop="4">
				{
					isLoading ? (
						<Text>Loading....</Text>
					) : (isError ? (
						<Text>Belum ada catatan</Text>
					) : (
						data.data.map((note:any) => (
							<Card id={note.id} handleDeleteButton={handleDeleteButton} title={note.title} body={note.body} createdAt={note.createdAt} key={note.id} />
						))
					))
				}
			</SimpleGrid>
			<Modal
				initialFocusRef={initialRef}
				finalFocusRef={finalRef}
				isOpen={isOpen}
				onClose={onClose}
			>
			<form onSubmit={async (e) => {
					e.preventDefault()

					if(title && description) {
						const response = await fetch('http://localhost:3000/api/catatan', {
							method: 'POST',
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
							title: "Berhasil menambah catatan",
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
	)
}
