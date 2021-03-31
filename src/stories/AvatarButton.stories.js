import React from 'react';

import {AvatarButton} from '../Components/CommonComponents/AvatarButton';
import avatarImg from './assets/avatar.jpg';

export default {
  title: 'Atoms/Buttons/AvatarButton',
  component: AvatarButton,
};

const img = {
  src: avatarImg,
  alt: 'Joe',
};

export const AllButtons = (args) => {
  return (
    <>
      <AvatarButton className="m-1" content="AZ" color="purple" />
      <AvatarButton className="m-1" content="AZ" disabled />
      <br />
      <AvatarButton className="m-1" src={img.src} alt={img.alt} />
      <AvatarButton className="m-1" src={img.src} alt={img.alt} disabled />
    </>
  );
};

export const AvatarColours = (args) => {
  return (
    <>
      <AvatarButton className="m-1" content="AZ" />
      <AvatarButton className="m-1" content="AZ" color="purple" />
      <AvatarButton className="m-1" content="AZ" color="green" />
      <AvatarButton className="m-1" content="AZ" color="orange" />
    </>
  );
};
