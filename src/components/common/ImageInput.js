import React from "react";
import PropTypes from "prop-types";

const ImageInput = ({ name, label, onChange, placeholder, value, error }) => {
  let wrapperClass = "form-group";
  if (error && error.length > 0) {
    wrapperClass += " " + "has-error";
  }

  let imgPreview;
  console.log(value);
  if (value) {
    imgPreview = <img className='img-thumbnail col-6' src={value} alt='' />;
  }

  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>
      <div className='field'>
        <div className='form-group preview'>{imgPreview}</div>

        <div className='form-group'>
          <input
            type='file'
            className='form-control'
            onChange={onChange}
            // files={value}
            name={name}
          />
        </div>
        {error && <div className='alert alert-danger'>{error}</div>}
      </div>
    </div>
  );
};

ImageInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
};

export default ImageInput;
