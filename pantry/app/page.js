import {Box, Stack} from '@mui/material'

const item = [
  'tomato',
  'potato',
  'onion',
  'garlic',
  'carrot',
  'ginger',
  'lettuce',
  'arugula',
  'kale',
  'banana'

]

export default function Home() {
  return (
    <Box 
      width="100vw" 
      height="100vh" 
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Stack width="800px" height="300px" spacing={2} overflow={'scroll'}>

        {item.map((i) => (
          <Box
            key={i}
            width="100%"
            height="100px"
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            bgcolor={'lightblue'}>
              {i}
            </Box>
        ))}
      </Stack>
    </Box>
  );
}
