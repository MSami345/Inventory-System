'use client'
import useFetchData from '@/app/_components/useFetchData';
import { useParams } from 'next/navigation';
// import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import Sale from '../../page';
import { Sales } from '@/app/_components/types';

const EditSale = () => {

    const { clientId, salesId } = useParams();
    const { data, error, loading } = useFetchData({ endpoint: `sales/${clientId}/${salesId}` })
    useEffect(() => {
        console.log(clientId, salesId)
        if (data) {
            // const filteredSale: any = data.find((
            //     (sale) => sale.uid == salesId
            // ))
            console.log(data)
        }

    }, [salesId, data, error, loading])
    return (
        <div>EditSale</div>
    )
}

export default EditSale