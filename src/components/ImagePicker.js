import React, { useRef } from "react";

/**
 * React component to pick image
 * @param props props object
 * @param props.handleLoadEnd callback called when reader onloadend
 * @param props.onClick function added to onClick of img element
 * @param props.style css style object
 * @param props.otherProps rest of props passed down to img element
 * @returns
 */
const ImagePicker = ({ handleLoadEnd, onClick, style, ...otherProps }) => {
  const fileInputRef = useRef();

  return (
    <>
      <img
        onClick={(e) => {
          e.preventDefault();
          if (typeof onClick === "function") onClick(e);
          fileInputRef.current.click();
        }}
        style={{
          objectFit: "cover",
          cursor: "pointer",
          ...style,
        }}
        {...otherProps}
      />
      <input
        type="file"
        ref={fileInputRef}
        hidden
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            let reader = new FileReader();
            reader.onloadend = () => {
              handleLoadEnd(reader.result);
            };
            reader.readAsDataURL(file);
          }
        }}
      />
    </>
  );
};

export default ImagePicker;
