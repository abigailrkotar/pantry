'use client'
import {Box, Stack, Typography, Button, Modal, TextField} from '@mui/material'
import {firestore} from '@/firebase'
import {collection, getDocs, query, doc, setDoc} from 'firebase/firestore';
import {useEffect, useState} from 'react'


export default function Home() {
  const [pantry, setPantry] = useState([])

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [itemName, setItemName] = useState()

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const updatePantry = async () => {

    const snapshot = query(collection(firestore, 'pantry'))
    const docs = await getDocs(snapshot)
    const pantryList = []
    docs.forEach((doc) => {
      pantryList.push(doc.id)
    })
    console.log(pantryList)
    setPantry(pantryList)
  }

  useEffect(() => {
    updatePantry()
  }, [])

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'pantry'), item)
    await setDoc(docRef, {})
    updatePantry()
  }
  return (
    <Box 
      width="100vw" 
      Minheight="100vh" 
      display={"flex"}
      flexDirection={'column'}
      justifyContent={"center"}
      alignItems={"center"}
      gap={2}
    >
    <Button variant="contained" onClick={handleOpen}>Add</Button>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add Item
        </Typography>
        <Stack direction={'row'} spacing={'2'} width="100%">
            <TextField width="100%" id="outlined-basic" label="Item Name" variant="outlined" value={itemName}
            onChange={(e) => setItemName(e.target.value)}/>
            <Button variant="contained"
            onClick ={() => {
              addItem(itemName)
              setItemName('')
              handleClose()
            }
          }>Add</Button>
        </Stack>
        
          </Box>
      </Modal>  
    <Box border={'1px solid #333'}>
    
    
    <Box width="800px" height="100px" bgcolor={'lightblue'} 
    >
      <Typography variant={'h2'} color={'#333'} textAlign={'center'}>
        Pantry Items
      </Typography>
    </Box>
      <Stack width="800px" height="300px" spacing={2} overflow={'auto'}>

        {pantry.map((i) => (
          <Box
            key={i}
            width="100%"
            minHeight="150px"
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            bgcolor={'#f0f0f0'}>
              <Typography
              variant={'h3'}
              color={'#333'}
              textAlign={'center'}>
                {
                  //capitalize the first letter
                  i.charAt(0).toUpperCase() + i.slice(1)
                }
              </Typography>
              
            </Box>
        ))}
      </Stack>
      </Box>
    </Box>
  );
}
