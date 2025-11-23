import React from 'react'
import { motion } from "framer-motion";
import { useState } from 'react';

const Signature = () => {

    const [format, setFormat] = useState("pdf");

    return (
        <div>

            <aside className="w-full md:w-64 flex flex-col gap-3">
                <div className='flex items-center gap-2'>
                    <label className='text-sm font-medium text-slate-700'>Format</label>
                    <select
                        value={format}
                        className="ml-auto px-3 py-2 border rounded-md text-sm"
                    >
                        <option value="pdf">PDF</option>
                        <option value="jpeg">JPEG</option>
                    </select>
                </div>
                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-lg shadow"
                >
                    Download
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-slate-700 bg-white"
                >
                    Clear
                </motion.button>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    className="mt-2 p-3 bg-slate-50 rounded-md text-xs text-slate-500"
                >
                    Tip: For documents use <strong>PDF</strong>. For images use <strong>JPEG</strong>.
                </motion.div>
            </aside>

        </div>
    )
}

export default Signature
