import React from "react";
import PropTypes from "prop-types";
import Image from "material-ui-image";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
const ImageInput = ({ name, label, onChange, placeholder, value, error }) => {
  let wrapperClass = "form-group";
  if (error && error.length > 0) {
    wrapperClass += " has-error";
  }

  let imgPreview;
  console.log(value);
  if (value) {
    imgPreview = (
      <>
        <Image src={value} cover />
      </>
    );
  }

  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>
      <div className='field'>
        <div className='form-group preview'>{imgPreview}</div>

        <div className='form-group'>
          {/* <input
            type='file'
            className='form-control'
            onChange={onChange}
            // files={value}
            name={name}
          /> */}

          <input
            accept='image/*'
            style={{ display: "none" }}
            id='raised-button-file'
            onChange={onChange}
            type='file'
            name={name}
          />
          <label htmlFor='raised-button-file'>
            <Button variant='raised' component='span'>
              <Icon style={{ fontSize: 30 }}>add_circle</Icon>
            </Button>
          </label>
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
