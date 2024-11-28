import { useState } from 'react';
import { Client, Storage, ID } from 'appwrite';

// Initialize Appwrite Client
const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite endpoint
  .setProject('6743d8df002d04c65ce3'); // Replace with your Appwrite project ID

const storage = new Storage(client);

const ImageUpload = () => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Handle file selection and upload
  const handleImageUpload = async () => {
    const fileInput = document.getElementById('uploader') as HTMLInputElement;

    if (fileInput?.files?.length) {
      const file = fileInput.files[0]; // Get the first file
      setLoading(true);
      setError(null);

      try {
        const response = await storage.createFile(
          '6743d8f5003db9d551e4',  // Replace with your actual Appwrite bucket ID
          ID.unique(),    // Unique ID for the file
          file            // The file selected by the user
        );

        // Get the file URL to view the uploaded image
        const fileURL = `https://cloud.appwrite.io/v1/storage/buckets/6743d8f5003db9d551e4/files/${response.$id}/view?project=6743d8df002d04c65ce3`;
        
        setFileUrl(fileURL); // Set the file URL in the state
        console.log('File uploaded successfully:', response);
      } catch (uploadError) {
        setError('Error uploading the file');
        console.error('Error uploading file:', uploadError);
      } finally {
        setLoading(false);
      }
    } else {
      setError('No file selected');
    }
  };

  return (
    <div>
      <input type="file" id="uploader" accept="image/*" />
      <button onClick={handleImageUpload} disabled={loading}>
        {loading ? 'Uploading...' : 'Upload Image'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {fileUrl && (
        <div>
          <h3>Uploaded Image:</h3>
          <img src={fileUrl} alt="Uploaded" width={300} />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
