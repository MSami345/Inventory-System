import useFetchData from '@/app/_components/useFetchData';
import { db } from '@/app/_lib/firebaseConfig'
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'

const EditSale:NextPage = () => {
    const router = useRouter();
    const { id, client } = router.query;
    const { data, error, loading } = useFetchData({ endpoint: `sales/${client}/${id}` })
    useEffect(() => {
        if (data) {
            console.log(data)
        }

    }, [id, data, error, loading, db])
    return (
        <div>EditSale</div>
    )
}

export default EditSale