import './SubmitButton.css';

const SubmitButton = ({ title, disabled }) => {

  return (
    <button
      className={`button-submit ${!disabled && 'button-submit_disabled'}`}
      type="submit"
      disabled={!disabled}
    >
      {title}
    </button>
  );
}

export default SubmitButton;
