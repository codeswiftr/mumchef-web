import React from "react";
import Image from "material-ui-image";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import styled from "styled-components";

const Wrapper = styled.div`
  min-width: 327px;
  min-height: 327px;
`;
const ImageInput = ({ name, label, onChange, placeholder, value, error }) => {
  let wrapperClass = "form-group";
  if (error && error.length > 0) {
    wrapperClass += " has-error";
  }

  let imgPreview = <Image src={value} />;

  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>
      <div className='field'>
        <Wrapper>{imgPreview}</Wrapper>

        <div className='form-group'>
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

export default ImageInput;
