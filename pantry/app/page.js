'use client'
import {Box, Stack, Typography, Button, Modal, TextField, Listbox} from '@mui/material'
import {firestore} from '@/firebase'
import {collection, getDocs, query, doc, setDoc, deleteDoc, getDoc} from 'firebase/firestore'
import {useEffect, useState} from 'react'
import Autocomplete from '@mui/material/Autocomplete';



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
      pantryList.push({"name": doc.id, ... doc.data()})
    })
    console.log(pantryList)
    setPantry(pantryList)
  }

  useEffect(() => {
    updatePantry()
  }, [])

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'pantry'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
        const {count} = docSnap.data()
        await setDoc(docRef, {count: count + 1})
    }
    else {
      await setDoc(docRef, {count: 1})
    }
    await updatePantry()
  }

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'pantry'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const {count} = docSnap.data()
      if (count == 1) {
        await deleteDoc(docRef)
      }
      else
      {
        await setDoc(docRef, {count: count - 1})
      }
    }
    await updatePantry()
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
    <Box width="800px" height="75px" bgcolor={'light-gray'} justifyItems={'center'} > 
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={pantry.map(({name, count}) => (
          name.charAt(0).toUpperCase() + name.slice(1)
        ))}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Find" InputProps={{
          ...params.InputProps,
          type: 'search',
        }} />}
    />
    </Box>

      <Stack width="800px" height="300px" spacing={2} overflow={'auto'}>

        {pantry.map(({name, count}) => (
        <Stack key = {name} direction={'row'} spacing={2} justifyContent={'center'} paddingX={2}alignItems={'space-between'}>
          <Box
            key={name}
            width="100%"
            minHeight="150px"
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            bgcolor={'#f0f0f0'}
            gap={5}>
              <Typography
              variant={'h3'}
              color={'#333'}
              textAlign={'center'}>
                {
                  //capitalize the first letter
                  name.charAt(0).toUpperCase() + name.slice(1)
                }
              </Typography>
              <Typography variant={'h3'} color={'#333'} textAlign={'center'}>
                  Quantity: {count}
              </Typography>
              
            </Box>
            <Button variant="contained" sx={{backgroundColor: '#FF3632',
                                            "&:hover": {backgroundColor: '#FF0000'}}}
          onClick={() => 
              removeItem(name)
            }>Delete</Button>
            <Button variant="contained"  sx={{backgroundColor: '#1fd655',
                                            "&:hover": {backgroundColor: '#00ab41'}
            }}onClick={() =>
              addItem(name)}
            >Add</Button>
   
          </Stack>
        ))}
      </Stack>
      </Box>
    </Box>
  );
}
