import React from 'react';

import {Avatar} from '../Components/CommonComponents/Avatar';
import avatarImg from './assets/avatar.jpg';

export default {
  title: 'Design System/Avatar',
  component: Avatar,
};

const img = {
  src: avatarImg,
  alt: 'Joe',
};

export const AllAvatars = (args) => {
  return (
    <>
      <Avatar className="m-1" content="AZ" color="purple" />
      <Avatar className="m-1" src={img.src} alt={img.alt} />
    </>
  );
};

export const AvatarColours = (args) => {
  return (
    <>
      <Avatar className="m-1" content="AZ" />
      <Avatar className="m-1" content="AZ" color="purple" />
      <Avatar className="m-1" content="AZ" color="green" />
      <Avatar className="m-1" content="AZ" color="orange" />
    </>
  );
};
