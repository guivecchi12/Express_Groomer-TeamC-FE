import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { registerGroomer } from '../../../api/index';
import styled from 'styled-components';

const StyledRegDiv = styled.div`
  width: 100%;
  height: 100%;
  padding-bottom: 10%;
  display: flex;
  justify-content: center;
  background-color: #3e5c76;
  color: #c5e8e8;
`;

const StyledH1 = styled.h1`
  margin: 0% 0% 2% 0%;
  padding: 2% 0% 1% 0%;
  font-size: 2.5em;
  color: #f0f9f9;
  width: 100%;
  background-color: #1d2d44;
  text-align: center;
`;

const StyledInput = styled.input`
  color: #3e5c76;
`;

const StyledSubmit = styled.button`
  background-color: #1d2d44;
`;

const GroomerRegistration = props => {
  const defaultUser = {
    name: '',
    lastname: '',
    email: props.location.state.email,
    latitude: '',
    longitude: '',
    phone: '',
    zip: '',
    address: '',
    city: '',
    state: '',
    country: '',
    photo_url: 'https://images.unsplash.com/photo-1586057710892-4f30aed09a20',
    walk_rate: 0,
    day_care_rate: 0,
    vet_visit_rate: 0,
  };

  const { register, handleSubmit, errors } = useForm();
  const [user, setUser] = useState(defaultUser);

  const onSubmit = () => {
    props.registerGroomer(user, props);
  };

  const handleInputChange = event => {
    event.preventDefault();

    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <StyledRegDiv className="registration-container">
      <StyledH1>Groomer Registration</StyledH1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledInput
          type="text"
          id="name"
          name="name"
          placeholder="First Name"
          onChange={handleInputChange}
          aria-invalid={errors.name ? 'true' : 'false'}
          ref={register({ required: true, maxLength: 30 })}
        />

        {errors.name && errors.name.type === 'required' && (
          <span role="alert">This is required</span>
        )}
        {errors.name && errors.name.type === 'maxLength' && (
          <span role="alert">Max length exceeded</span>
        )}

        <StyledInput
          type="text"
          id="lastname"
          name="lastname"
          placeholder="Last Name"
          onChange={handleInputChange}
          aria-invalid={errors.lastname ? 'true' : 'false'}
          ref={register({ required: true, maxLength: 30 })}
        />

        <StyledInput
          type="text"
          id="email"
          name="email"
          placeholder="email"
          onChange={handleInputChange}
          aria-invalid={errors.email ? 'true' : 'false'}
          ref={register({ required: true, maxLength: 30 })}
        />

        {errors.lastname && errors.lastname.type === 'required' && (
          <span role="alert">This is required</span>
        )}
        {errors.lastname && errors.lastname.type === 'maxLength' && (
          <span role="alert">Max length exceeded</span>
        )}

        <StyledInput
          type="text"
          id="phone"
          name="phone"
          placeholder="Phone"
          onChange={handleInputChange}
          aria-invalid={errors.phone ? 'true' : 'false'}
          ref={register({ required: true, maxLength: 30 })}
        />

        {errors.phone && errors.phone.type === 'required' && (
          <span role="alert">This is required</span>
        )}
        {errors.phone && errors.phone.type === 'maxLength' && (
          <span role="alert">Max length exceeded</span>
        )}

        <StyledInput
          type="text"
          id="address"
          name="address"
          placeholder="Address"
          onChange={handleInputChange}
          aria-invalid={errors.address ? 'true' : 'false'}
          ref={register({ required: true, maxLength: 30 })}
        />

        {errors.address && errors.address.type === 'required' && (
          <span role="alert">This is required</span>
        )}
        {errors.address && errors.address.type === 'maxLength' && (
          <span role="alert">Max length exceeded</span>
        )}

        <StyledInput
          type="text"
          id="city"
          name="city"
          placeholder="City"
          onChange={handleInputChange}
          aria-invalid={errors.city ? 'true' : 'false'}
          ref={register({ required: true, maxLength: 30 })}
        />

        {errors.city && errors.city.type === 'required' && (
          <span role="alert">This is required</span>
        )}
        {errors.city && errors.city.type === 'maxLength' && (
          <span role="alert">Max length exceeded</span>
        )}

        <StyledInput
          type="text"
          id="state"
          name="state"
          placeholder="State"
          onChange={handleInputChange}
          aria-invalid={errors.state ? 'true' : 'false'}
          ref={register({ required: true, maxLength: 30 })}
        />

        {errors.state && errors.state.type === 'required' && (
          <span role="alert">This is required</span>
        )}
        {errors.state && errors.state.type === 'maxLength' && (
          <span role="alert">Max length exceeded</span>
        )}

        <StyledInput
          type="text"
          id="country"
          name="country"
          placeholder="Country"
          onChange={handleInputChange}
          aria-invalid={errors.country ? 'true' : 'false'}
          ref={register({ required: true, maxLength: 30 })}
        />

        {errors.country && errors.country.type === 'required' && (
          <span role="alert">This is required</span>
        )}
        {errors.country && errors.country.type === 'maxLength' && (
          <span role="alert">Max length exceeded</span>
        )}

        <StyledInput
          type="text"
          id="zipcode"
          name="zip"
          placeholder="Zip code"
          onChange={handleInputChange}
          aria-invalid={errors.zipcode ? 'true' : 'false'}
          ref={register({ required: true, maxLength: 30 })}
        />

        {errors.zipcode && errors.zipcode.type === 'required' && (
          <span role="alert">This is required</span>
        )}
        {errors.zipcode && errors.zipcode.type === 'maxLength' && (
          <span role="alert">Max length exceeded</span>
        )}

        <StyledInput
          type="text"
          id="description"
          name="description"
          placeholder="Description"
          onChange={handleInputChange}
          aria-invalid={errors.description ? 'true' : 'false'}
          ref={register({ required: true, maxLength: 300 })}
        />

        {errors.description && errors.description.type === 'required' && (
          <span role="alert">This is required</span>
        )}
        {errors.description && errors.description.type === 'maxLength' && (
          <span role="alert">Max length exceeded</span>
        )}

        <StyledInput
          type="text"
          id="photoUrl"
          name="photo_url"
          placeholder="Photo URL"
          onChange={handleInputChange}
          aria-invalid={errors.zipcode ? 'true' : 'false'}
          ref={register({ required: false, maxLength: 300 })}
        />

        {errors.photoUrl && errors.photoUrl.type === 'maxLength' && (
          <span role="alert">Max length exceeded</span>
        )}

        <p>Do you groom: </p>
        <div>
          <StyledInput
            type="checkbox"
            id="grooms_dogs"
            name="grooms_dogs"
            value="Dogs"
          />
          <label htmlFor="grooms_dogs"> Dogs </label>
        </div>

        <div>
          <StyledInput
            type="checkbox"
            id="grooms_cats"
            name="grooms_cats"
            value="Cats"
          />
          <label htmlFor="grooms_cats"> Cats </label>
        </div>

        <StyledInput
          type="text"
          id="walk_rate"
          name="walk_rate"
          placeholder="Walk rate"
          onChange={handleInputChange}
          aria-invalid={errors.walk_rate ? 'true' : 'false'}
          ref={register({ required: true, maxLength: 100 })}
        />

        {errors.walk_rate && errors.walk_rate.type === 'required' && (
          <span role="alert">This is required</span>
        )}
        {errors.walk_rate && errors.walk_rate.type === 'maxLength' && (
          <span role="alert">Max length exceeded</span>
        )}

        <StyledInput
          type="text"
          id="day_care_rate"
          name="day_care_rate"
          placeholder="Day care rate"
          onChange={handleInputChange}
          aria-invalid={errors.day_care_rate ? 'true' : 'false'}
          ref={register({ required: true, maxLength: 100 })}
        />

        {errors.day_care_rate && errors.day_care_rate.type === 'required' && (
          <span role="alert">This is required</span>
        )}
        {errors.day_care_rate && errors.day_care_rate.type === 'maxLength' && (
          <span role="alert">Max length exceeded</span>
        )}

        <StyledInput
          type="text"
          id="vet_visit_rate"
          name="vet_visit_rate"
          placeholder="Vet visit rate"
          onChange={handleInputChange}
          aria-invalid={errors.vet_visit_rate ? 'true' : 'false'}
          ref={register({ required: true, maxLength: 100 })}
        />

        {errors.vet_visit_rate && errors.vet_visit_rate.type === 'required' && (
          <span role="alert">This is required</span>
        )}
        {errors.vet_visit_rate &&
          errors.vet_visit_rate.type === 'maxLength' && (
            <span role="alert">Max length exceeded</span>
          )}

        <StyledSubmit type="submit">Submit</StyledSubmit>
      </form>
    </StyledRegDiv>
  );
};

const mapStateToProps = state => {
  return {
    groomer: state.groomerReducer.groomer,
  };
};

export default connect(mapStateToProps, { registerGroomer })(
  GroomerRegistration
);
