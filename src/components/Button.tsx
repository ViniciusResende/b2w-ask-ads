import React, { ButtonHTMLAttributes } from 'react';

import '../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};

const components = ({ isOutlined = false, ...rest }: ButtonProps) => {
  return <button className={`button ${isOutlined && 'outlined'}`} {...rest} />;
};

export default components;
