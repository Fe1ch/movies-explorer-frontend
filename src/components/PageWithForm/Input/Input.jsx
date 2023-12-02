import './Input.css';

const Input = ({
  name,
  type,
  value,
  pattern,
  required,
  label,
  onChange,
  validationMessage,
  minLength,
  maxLength,
  placeholder,
  disabled,
}) => {

  return (
    <div className="input__container">
      <label className="input__label" htmlFor={name}>
        {label}
      </label>
      <input
        className={`input ${validationMessage && 'input_invalid'}`}
        type={type}
        name={name}
        id={name}
        value={value}
        pattern={pattern}
        onChange={onChange}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete='off'
      />
      <span className="input__error">{validationMessage}</span>
    </div>
  );
}

export default Input;