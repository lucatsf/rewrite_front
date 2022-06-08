import { Button, Flex, Stack, Textarea, Text, Box } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { api } from '../services/api';

export default function Home() {

  const { register, handleSubmit } = useForm();
  const getTextareaRef = useRef<HTMLTextAreaElement>(null)
  const [ showNewText, setShowNewText ] = useState(false)
  const [ newText, setNewText ] = useState('')
  const [ textLength, setTextLength ] = useState(0)
  const [ textWords, setTextWords ] = useState(0)

  function handleTextarea() {
    if (getTextareaRef.current?.value) {
      api.post('rewrite', {
        text: getTextareaRef.current?.value
      })
      .then(({ data }) => {
        if (data.newText) {
          setShowNewText(true)
          setNewText(data.newText.text[0])
          setTextLength(data.newText.textLength)
          setTextWords(data.newText.textWords)
        }
      })
    }
  }

  return (
    <>
        <Text
          fontSize='4xl'
          align="center"
          pb={10}
        >
          Digite seu texto
        </Text>

        <Flex
          w="100%"
          h="100%"
          align="center"
          justify="center"
        >
          <Flex
            as="form"
            w="100%"
            maxWidth={860}
            bg="gray.800"
            p="8"
            borderRadius={8}
            flexDir="column"
            onSubmit={handleSubmit(handleTextarea)}
          >
            <Stack spacing={10}>
              <Textarea
                h={460}
                resize="none"
                ref={ getTextareaRef }
              />

              <Button
                mt={6}
                colorScheme="blue"
                type="submit"
              >
                Reescrever texto
              </Button>

              { showNewText ? (
                  <>
                    <Text pt={10}>
                      { newText }
                    </Text>

                    <Box>
                      Total de caracteres: { textLength } | Total de palavras: { textWords }
                    </Box>
                  </>
                ) : (<></>)
              }
            </Stack>
          </Flex>
        </Flex>
    </>
  )
}
