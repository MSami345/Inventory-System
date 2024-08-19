import useFetchData from '@/app/_components/useFetchData';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'

const EditSale: NextPage = () => {
    const router = useRouter();
    const { clientId, saleId } = router.query;
    const { data, error, loading } = useFetchData({ endpoint: `sales/${clientId}/${saleId}` })
    useEffect(() => {
        console.log(clientId, saleId)
        if (data) {
            console.log(data)
        }

    }, [saleId, data, error, loading])
    return (
        <div>EditSale</div>
    )
}

export default EditSale