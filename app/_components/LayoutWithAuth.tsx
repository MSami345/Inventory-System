'use client'
import React, { ReactNode } from 'react'
import Navbar from '../Navbar'
import WithAuthentication from './WithAuthentication'

const LayoutWithAuth = ({ children }: { children: ReactNode }) => {
    return (
        <WithAuthentication>
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow"> {children}</main>
                <footer id="contact" className="bg-gray-800 py-6">
                    <div className="container mx-auto px-4 text-center text-white">
                        <p className="mb-4">
                            &copy; {new Date().getFullYear()} Inventory System. All rights
                            reserved.
                        </p>
                        <p>Contact us: info@inventorysystem.com</p>
                    </div>
                </footer>
            </div>
        </WithAuthentication>
    )
}

export default LayoutWithAuth