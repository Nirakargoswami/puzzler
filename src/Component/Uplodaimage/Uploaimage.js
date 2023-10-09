import React from 'react';
import {HandleImageUpdload} from "../../../src/Firebase/firebse"


const ImageUpload = () => {


  const handleImageUploads = (event) => {
    HandleImageUpdload(event)
    const file = event.target.files[0];



    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const fileContent = e.target.result;
   
        // You can perform further actions with the file content here
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageUploads} />
    </div>
  );
};

export default ImageUpload;
