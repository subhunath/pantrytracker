'use client'
import { useState, useEffect } from 'react'
import { firestore } from '../firebase'
import { collection, getDocs, query } from 'firebase/firestore'
import { Box, Stack, Typography } from "@mui/material";

export default function Home() {
  const [inventory, setInventory] = useState([])
  const [open, setOpen] = useState([false])
  const [itemName, setItemName] = useState('')

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'))
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      })
    })
    setInventory(inventoryList)
    console.log(inventoryList)
  }

  useEffect(() => {
    updateInventory()
  }, [])

  return <Box>
    <Typography variant="h1">
      Pantry Tracker
    </Typography>
    {inventory.forEach((item) => {
      return (
        <>
          <Typography variant="h2">
            {item.name}
            {item.count}
          </Typography>
        </>
      )
    })}
  </Box>
}