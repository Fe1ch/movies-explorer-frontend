import './Login.css';
import Input from '../Input/Input';
import SubmitButton from '../SubmitButton/SubmitButton';
import PageWithForm from '../PageWithForm';
import useFormValidation from '../../../utils/hooks/useFormValidation';

const Login = ({ handleLogin, isServerMessageError, isDisabledInput }) => {

  const { values, handleChange, errors, isValid, resetForm } = useFormValidation();

  const onSubmit = (e) => {
    e.preventDefault();
    handleLogin(values.email, values.password);
    resetForm();
  };


  return (
    <main className="content">
      <PageWithForm
        title="Рады видеть!"
        formName="login-form"
        underButtonText="Ещё не зарегистрированы?"
        link="/signup"
        linkName="Регистрация"
        onSubmit={onSubmit}
      >
        <div className="login__container">
          <Input
            name="email"
            type="email"
            label="E-mail"
            pattern="^\S+@\S+\.\S+$"
            value={values.email || ''}
            onChange={handleChange}
            required={true}
            validationMessage={errors.email}
            minLength="2"
            placeholder="E-mail"
            disabled={isDisabledInput}
          />
          <Input
            name="password"
            type="password"
            label="Пароль"
            value={values.password || ''}
            onChange={handleChange}
            required={true}
            validationMessage={errors.password}
            minLength="8"
            maxLength="30"
            placeholder="Введите пароль"
            disabled={isDisabledInput}
          />
          <span className="login__error">
            {isServerMessageError}
          </span>
        </div>
        <SubmitButton
          title="Войти"
          disabled={isValid}
        />
      </PageWithForm>
    </main>
  );
}

export default Login;