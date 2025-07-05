'use client'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Custom toast styles
const toastStyles = `
  .Toastify__toast--success {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;
    color: white !important;
    font-weight: 700 !important;
    border: 2px solid #065f46 !important;
  }
  .Toastify__toast--error {
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%) !important;
    color: white !important;
    font-weight: 700 !important;
    border: 2px solid #991b1b !important;
  }
  .Toastify__toast--info {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%) !important;
    color: white !important;
    font-weight: 700 !important;
    border: 2px solid #1e40af !important;
  }
  .Toastify__toast--warning {
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%) !important;
    color: white !important;
    font-weight: 700 !important;
    border: 2px solid #92400e !important;
  }
  .Toastify__close-button {
    color: white !important;
    opacity: 0.8 !important;
  }
  .Toastify__close-button:hover {
    opacity: 1 !important;
  }
`

export default function ToastProvider() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: toastStyles }} />
      <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      style={{
        fontSize: '0.875rem',
        zIndex: 9999,
        top: '20px',
        right: '20px'
      }}
      toastStyle={{
        borderRadius: '0.75rem',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.25)',
        border: '2px solid rgba(0, 0, 0, 0.1)',
        fontSize: '0.95rem',
        fontWeight: '600',
        color: '#1f2937',
        minHeight: '60px'
      }}
    />
    </>
  )
}