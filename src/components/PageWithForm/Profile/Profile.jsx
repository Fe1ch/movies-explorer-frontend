import './Profile.css';
import useFormValidation from '../../../utils/hooks/useFormValidation';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';
import { useContext, useEffect, useState } from 'react';

const Profile = ({ handleLogout, handleUpdateProfile, isServerMessageError, isDisabledInput, isServerMessageComplete }) => {

  const [isVisible, setIsVisible] = useState(false);
  const [isDisable, setIsDisabled] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { name, email } = useContext(CurrentUserContext);

  const { values, setValues, handleChange, errors } = useFormValidation();

  useEffect(() => {
    setValues({
      name: name,
      email: email,
    })
  }, [setValues]);

  useEffect(() => {
    if (name !== values.name || email !== values.email) {
      setIsDisabled(true)
    } else {
      setIsDisabled(false)
    }
  }, [email, name, values.email, values.name])

  const changeVisibility = () => {
    setIsVisible(true);
  }

  const onSubmit = (e) => {
    e.preventDefault()
    handleUpdateProfile({
      name: values.name,
      email: values.email,
    })
    setIsEditing(true)
    setTimeout(() => {
      setIsVisible(false)
      setIsEditing(false)
    }, 2500)
  }



  return (
    <main className="content">
      <section className="profile">
        <h1 className="profile__name">{`Привет, ${name}!`}</h1>
        <form
          className="profile__form"
          name="profile-form"
          onSubmit={onSubmit}
          noValidate
        >
          <label className="profile__input-label">
            Имя
            <input
              className={`profile__input ${errors.name && 'profile__input_error'}`}
              type="text"
              name="name"
              value={values.name || ''}
              onChange={handleChange}
              minLength="2"
              maxLength="30"
              required
              disabled={isEditing || isDisabledInput || !isVisible}
            />
            <span className="profile__input-error">
              {errors.name}
            </span>
          </label>
          <label className="profile__input-label">
            E-mail
            <input
              className={`profile__input ${errors.email && 'profile__input_error'}`}
              type="email"
              name="email"
              pattern="^\S+@\S+\.\S+$"
              value={values.email || ''}
              onChange={handleChange}
              required
              disabled={isEditing || isDisabledInput || !isVisible}
            />
            <span className="profile__input-error">
              {errors.email}
            </span>
          </label>
          <div className="profile__button-container">
            {isVisible ? (
              <>
                {<span className={`profile__error ${isServerMessageComplete && 'profile__complete'}`}>
                  {isServerMessageError
                    ? 'При обновлении профиля произошла ошибка.'
                    : isServerMessageComplete
                      ? 'Профиль успешно обновлен.'
                      : ''}
                </span>}
                <button
                  className={`profile__button-save ${!isDisable ? 'profile__button-save_disabled' : ''} `}
                  type='submit'
                  onClick={changeVisibility}
                  disabled={!isDisable}
                >
                  Сохранить
                </button>
                <button
                  className='profile__button-cancel'
                  type='button'
                  onClick={() => { setIsVisible(false) }}
                >
                  Отменить
                </button>
              </>) : (<>
                <button
                  className='profile__button-edit'
                  type="button"
                  onClick={changeVisibility}
                >
                  Редактировать
                </button>
                <button
                  className="profile__button-logout"
                  type="button"
                  onClick={handleLogout}
                >
                  Выйти из аккаунта
                </button>
              </>)}

          </div>
        </form>
      </section >
    </main >
  );
}

export default Profile;