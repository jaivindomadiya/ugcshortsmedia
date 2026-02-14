// import React from 'react';
// import { importFirestoreData } from '../importData';

// export const DataImporter: React.FC = () => {
//     const [status, setStatus] = React.useState<'idle' | 'importing' | 'success' | 'error'>('idle');
//     const [message, setMessage] = React.useState('');

//     const handleImport = async () => {
//         setStatus('importing');
//         setMessage('Importing data to Firestore...');

//         try {
//             await importFirestoreData();
//             setStatus('success');
//             setMessage('✅ All data imported successfully! Check your Firebase Console.');
//         } catch (error) {
//             setStatus('error');
//             setMessage(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
//         }
//     };

//     return (
//         <div style={{
//             position: 'fixed',
//             bottom: '20px',
//             right: '20px',
//             padding: '20px',
//             background: 'white',
//             border: '2px solid #4CAF50',
//             borderRadius: '10px',
//             boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
//             zIndex: 9999,
//             maxWidth: '400px'
//         }}>
//             <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>Firebase Data Importer</h3>

//             {status === 'idle' && (
//                 <button
//                     onClick={handleImport}
//                     style={{
//                         padding: '10px 20px',
//                         background: '#4CAF50',
//                         color: 'white',
//                         border: 'none',
//                         borderRadius: '5px',
//                         cursor: 'pointer',
//                         fontSize: '16px',
//                         fontWeight: 'bold'
//                     }}
//                 >
//                     Import Sample Data
//                 </button>
//             )}

//             {status === 'importing' && (
//                 <div style={{ color: '#2196F3' }}>⏳ {message}</div>
//             )}

//             {status === 'success' && (
//                 <div style={{ color: '#4CAF50' }}>{message}</div>
//             )}

//             {status === 'error' && (
//                 <div style={{ color: '#f44336' }}>{message}</div>
//             )}

//             <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
//                 This will create sample data in your Firestore database including your Dusk Beauty video.
//             </p>
//         </div>
//     );
// };
