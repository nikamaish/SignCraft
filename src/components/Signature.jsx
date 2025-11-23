import React from 'react'
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from 'react';
import SignaturePad from "signature_pad";
import { jsPDF } from "jspdf";


const Signature = () => {

    const canvasRef = useRef(null);
    const padRef = useRef(null);
    //canvasRef → points to the HTML <canvas> element, padRef → stores the SignaturePad object
    const [isEmpty, setIsEmpty] = useState(true);
    //   if the user has drawn something.
    const [format, setFormat] = useState("pdf");

    useEffect(() => {
        const canvas = canvasRef.current;
        //run this once when the component loads.

        // Simple resize so the canvas dimensions match CSS size and drawing works
        const resizeCanvas = () => {
            const ratio = window.devicePixelRatio || 1;
            canvas.width = Math.round(canvas.offsetWidth * ratio);
            canvas.height = Math.round(canvas.offsetHeight * ratio);
            const ctx = canvas.getContext("2d");
            ctx.scale(ratio, ratio);
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);
        // this addEventListener has 2 params: the event to listen for and the function to run.
        // here event name is "resize"
        // When screen size changes, canvas adjusts.

        padRef.current = new SignaturePad(canvas, {
            minWidth: 0.8,
            maxWidth: 2.2,
            penColor: "#0f172a", // slate-900
        });
        // this creates a new SignaturePad object and assigns it to padRef.current.

        // track empty state
        padRef.current.onEnd = () => setIsEmpty(padRef.current.isEmpty());
        padRef.current.onBegin = () => setIsEmpty(padRef.current.isEmpty());



        return () => {
            window.removeEventListener("resize", resizeCanvas);
            padRef.current.off && padRef.current.off();
        };
    }, []);

    const clearSignature = () => {
        padRef.current.clear();
        setIsEmpty(true);
    };

    const downloadJPEG = () => {
        // simple: export canvas as JPEG (white background is handled by canvas default)
        const dataURL = canvasRef.current.toDataURL("image/jpeg");
        const link = document.createElement("a");
        link.href = dataURL;
        link.download = "signature.jpg";
        link.click();
    };

    const downloadPDF = () => {
        if (padRef.current.isEmpty()) {
            alert("Please sign before downloading.");
            return;
        }
        const imgData = padRef.current.toDataURL("image/png");
        const pdf = new jsPDF();
        pdf.addImage(imgData, "PNG", 10, 10, 180, 60);
        pdf.save("signature.pdf");
    };

    const handleDownload = () => {
        if (padRef.current.isEmpty()) {
            alert("Please sign before downloading.");
            return;
        }
        if (format === "pdf") downloadPDF();
        else downloadJPEG();
    };

    return (

        <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="md:w-[100%] md:h-[60vh] bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 mx-10 md:mx-auto mt-10 mb-20 "
        >


            <div className="flex flex-col md:flex-row gap-6 ">
                
                <div className="flex-1 ">
                    <canvas
                        ref={canvasRef}
                        className="w-full md:h-full  bg-gray-200 cursor-crosshair rounded-lg"
                        style={{ touchAction: "none" }}
                    />
                    <p className="mt-2 text-xs text-black-400">Use mouse or touch to sign. Tap Clear to restart.</p>
                </div>


                <aside className="w-full md:w-64 flex flex-col gap-3">
                    <div className='flex items-center gap-2'>
                        <label className='text-sm font-medium text-slate-700'>Format</label>
                        <select
                            value={format}
                            className="ml-auto px-3 py-2 border rounded-md text-sm"
                            onChange={(e) => setFormat(e.target.value)}

                        >
                            <option value="pdf">PDF</option>
                            <option value="jpeg">JPEG</option>
                        </select>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-lg shadow"
                        onClick={handleDownload}
                    >
                        Download
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-slate-700 bg-white"
                        onClick={clearSignature}
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
        </motion.section >
    )
}

export default Signature
