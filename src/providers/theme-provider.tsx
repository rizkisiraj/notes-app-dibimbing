'use client';

import { ChakraProvider } from '@chakra-ui/react'
import { ReactNode } from 'react';

export default function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ChakraProvider>
      {children}
    </ChakraProvider >
  );
}