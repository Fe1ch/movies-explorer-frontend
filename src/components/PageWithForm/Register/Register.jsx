import './Register.css';
import Input from '../Input/Input';
import SubmitButton from '../SubmitButton/SubmitButton';
import PageWithForm from '../PageWithForm';
import { useForm } from '../../../utils/hooks/useForm';

const Register = () => {

  const { values, handleChange } = useForm({
    name: {
      isValid: '',
      validationMessage: '',
      value: '',
    },
    email: {
      isValid: '',
      validationMessage: '',
      value: '',
    },
    password: {
      isValid: '',
      validationMessage: '',
      value: '',
    },
  });

  return (
    <PageWithForm
      title="Добро пожаловать!"
      formName="register-form"
      underButtonText="Уже зарегистрированы?"
      link="/signin"
      linkName="Войти"
    >
      <div className="register__container">
        <Input
          name="name"
          type="text"
          label="Имя"
          value={values.name.value}
          onChange={handleChange}
          required={true}
          validationMessage={values.name.validationMessage}
        />
        <Input
          name="email"
          type="email"
          label="E-mail"
          value={values.email.value}
          onChange={handleChange}
          required={true}
          validationMessage={values.email.validationMessage}
        />
        <Input
          name="password"
          type="password"
          label="Пароль"
          value={values.password.value}
          onChange={handleChange}
          required={true}
          validationMessage={values.password.validationMessage}
        />
        <span className="register__error">
          Пользователь с таким email уже существует.
        </span>
      </div>
      <SubmitButton
        title="Зарегистрироваться"
        disabled={
          values.name.isValid && values.email.isValid && values.password.isValid
        }
      />
    </PageWithForm>
  );
}

export default Register;
