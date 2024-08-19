'use client'
import { useState } from 'react'
import { db } from '../_lib/firebaseConfig'
import { ref, remove } from 'firebase/database'
import { message } from 'antd'

const useDeleteData = () => {

    const [deleteLoad, setDeleteLoad] = useState(true)
    const deleteData = async (endpoint: string) => {

        try {
            // console.log(endpoint)
            await remove(ref(db, endpoint))
            message.success("Item Deleted Successfully")
            setDeleteLoad(false)
        } catch (err) {
            message.error((err as Error).message);
            setDeleteLoad(false)
        }
    };

    return { deleteData, deleteLoad }
}

export default useDeleteData