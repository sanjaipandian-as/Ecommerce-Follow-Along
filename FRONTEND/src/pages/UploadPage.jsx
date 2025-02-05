// import React, { useState } from 'react';
// import axios from 'axios';

// const UploadPage = () => {
//   const [file, setFile] = useState(null);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!file) {
//       alert('Please select a file to upload');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await axios.post('YOUR_UPLOAD_ENDPOINT', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       console.log('File uploaded successfully', response.data);
//       alert('File uploaded successfully');
//     } catch (error) {
//       console.error('Error uploading file', error);
//       alert('Error uploading file');
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div>
//           <label htmlFor="file" className="block text-sm font-medium text-gray-700">
//             Upload Image
//           </label>
//           <input
//             type="file"
//             id="file"
//             name="file"
//             accept="image/*"
//             onChange={handleFileChange}
//             className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//         >
//           Upload
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UploadPage;
