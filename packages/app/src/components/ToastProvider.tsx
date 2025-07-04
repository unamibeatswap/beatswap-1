'use client'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Custom toast styles
const toastStyles = `
  .Toastify__toast--success {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
  }
  .Toastify__toast--error {
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    color: white;
  }
  .Toastify__toast--info {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white;
  }
  .Toastify__toast--warning {
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
    color: white;
  }
`

export default function ToastProvider() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: toastStyles }} />
      <ToastContainer
      position="top-center"
      autoClose={4000}
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
        top: '80px'
      }}
      toastStyle={{
        borderRadius: '0.75rem',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        fontSize: '0.9rem',
        fontWeight: '500'
      }}
    />
    </>
  )
}