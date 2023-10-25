import './Register.css';
import Input from '../Input/Input';
import SubmitButton from '../SubmitButton/SubmitButton';
import PageWithForm from '../PageWithForm';
import useFormValidation from '../../../utils/hooks/useFormValidation';

const Register = ({ handleRegistration, isServerMessageError, isDisabledInput }) => {

  const { values, handleChange, errors, isValid } = useFormValidation();

  const onSubmit = (e) => {
    e.preventDefault();
    handleRegistration(values.name, values.email, values.password);
  };

  return (
    <main className="content">
      <PageWithForm
        title="Добро пожаловать!"
        formName="register-form"
        underButtonText="Уже зарегистрированы?"
        link="/signin"
        linkName="Войти"
        onSubmit={onSubmit}
      >
        <div className="register__container">
          <Input
            name="name"
            type="text"
            label="Имя"
            value={values.name || ''}
            onChange={handleChange}
            required={true}
            minLength="2"
            maxLength="30"
            placeholder="Имя"
            validationMessage={errors.name}
            disabled={isDisabledInput}
          />
          <Input
            name="email"
            type="email"
            label="E-mail"
            pattern="^\S+@\S+\.\S+$"
            value={values.email || ''}
            onChange={handleChange}
            required={true}
            minLength="2"
            placeholder="E-mail"
            validationMessage={errors.email}
            disabled={isDisabledInput}
          />
          <Input
            name="password"
            type="password"
            label="Пароль"
            value={values.password || ''}
            onChange={handleChange}
            required={true}
            minLength="8"
            maxLength="30"
            placeholder="Введите пароль"
            validationMessage={errors.password}
            disabled={isDisabledInput}
          />
          <span className="register__error">
            {isServerMessageError}
          </span>
        </div>
        <SubmitButton
          title="Зарегистрироваться"
          disabled={isValid}
        />
      </PageWithForm>
    </main>
  );
}

export default Register;
