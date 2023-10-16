function validation(name, value, errors) {

  let newErrors = { ...errors };
  if (name === "email") {
    if (!value) {
      newErrors[name] = "E-mail обязателен"
    };
  } else if (!/^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/.test(value)) {
    newErrors[name] = "Введите e-mail"
  };


  if (name === "password") {
    if (!value) {
      newErrors[name] = "Пароль обязателен"
    };
  } else if (value.length <= 8) {
    newErrors[name] = "Пароль не должен быть короче 8 символов"
  };

  if (name === "name") {
    if (!value) {
      newErrors[name] = "Имя обязательно"
    };
  } else if (!/^[a-zA-Z\s-]+$/.test(value)) {
    errors = {
      [name]: "Имя может содержать только латинские буквы, пробел или дефис",
    };
  } else if (value.length <= 2) {
    newErrors[name] = "Имя не должно быть короче 2 символов"
  };


  return errors;
}


export default validation;