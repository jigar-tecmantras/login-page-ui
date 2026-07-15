import React from 'react';

const InputField = ({
  label,
  id,
  type = 'text',
  value,
  placeholder,
  onChange,
  onBlur,
  error,
  ...rest
}) => (
  <div className={`input-field ${error ? 'has-error' : ''}`}>
    <label htmlFor={id}>{label}</label>
    <input
      id={id}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
      {...rest}
    />
    {error && (
      <span className="input-error" id={`${id}-error`}>
        {error}
      </span>
    )}
  </div>
);

export default InputField;
