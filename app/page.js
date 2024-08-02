'use client'
import { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import { collection, getDocs, query, getDoc, setDoc, doc, deleteDoc } from 'firebase/firestore';
import { Box, Stack, Typography, Modal, TextField, Button, Card, CardContent, CardActions, Grid, useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      });
    });
    setInventory(inventoryList);
  };

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      await setDoc(docRef, { quantity: 1 });
    }

    await updateInventory();
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }

    await updateInventory();
  };

  const updateItemQuantity = async (item, newQuantity) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    await setDoc(docRef, { quantity: newQuantity });
    await updateInventory();
  };

  useEffect(() => {
    updateInventory();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box width="100vw" height="100vh" display="flex" justifyContent="center" alignItems="center" gap={2} flexDirection="column" p={2}>
      <Modal open={open} onClose={handleClose}>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          width={isMobile ? '90%' : 400}
          bgcolor="white"
          border="2px solid #000"
          boxShadow={24}
          p={4}
          display="flex"
          flexDirection="column"
          gap={3}
          sx={{ transform: "translate(-50%, -50%)" }}
        >
          <Typography variant="h6">Add Item</Typography>
          <Stack width="100%" direction="row" spacing={2}>
            <TextField
              variant='outlined'
              fullWidth
              value={itemName}
              onChange={(e) => {
                setItemName(e.target.value);
              }}
            />
            <Button variant="outlined" onClick={() => {
              addItem(itemName);
              setItemName('');
              handleClose();
            }}>Add</Button>
          </Stack>
        </Box>
      </Modal>

      <Button
        variant="contained"
        onClick={handleOpen}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 1000,
        }}
      >
        Add New Item
      </Button>

      <Box border="1px solid #333" width={isMobile ? '100%' : '80%'} p={2} borderRadius={2} boxShadow={3} display="flex" flexDirection="column" height="80vh">
        <Box
          width="100%"
          bgcolor="#ADDBE6"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius={2}
          mb={2}
          p={2}
        >
          <Typography variant={isMobile ? "h4" : "h2"} color="#333">
            Inventory Items
          </Typography>
        </Box>
        
        <Box width="100%" display="flex" justifyContent="center" marginBottom={2}>
          <TextField
            variant="outlined"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
          />
        </Box>

        <Box flexGrow={1} overflow="auto">
          <Grid container spacing={2}>
            {filteredInventory.map(({ name, quantity }) => (
              <Grid item xs={12} sm={6} md={4} key={name}>
                <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
                  <CardContent>
                    <Typography variant='h5' color='#333'>
                      {name.charAt(0).toUpperCase() + name.slice(1)}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Button variant="contained" onClick={() => { removeItem(name) }}>
                        -
                      </Button>
                      <TextField
                        type="number"
                        value={quantity}
                        onChange={(e) => {
                          const newQuantity = parseInt(e.target.value, 10);
                          if (newQuantity >= 0) {
                            updateItemQuantity(name, newQuantity);
                          }
                        }}
                        inputProps={{ min: 0 }}
                      />
                      <Button variant="contained" onClick={() => { addItem(name) }}>
                        +
                      </Button>
                    </Stack>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}