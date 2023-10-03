import './AboutMe.css'
import authorPhoto from '../../images/author-photo.png';
import Portfolio from '../Portfolio/Portfolio'
import SectionTitle from '../SectionTitle/SectionTitle'


const AboutMe = () => {
  return (
    <section className="about-me " id="about-me">
      <SectionTitle title="Студент" />
      <article className="about-me__container">
        <h3 className="about-me__name">Михаил</h3>
        <p className="about-me__profession">
          Фронтенд-разработчик, 29 лет
        </p>
        <p className="about-me__text">
          Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
          и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
        </p>
        <a
          className="about-me__link link"
          href="https://github.com/Fe1ch"
          target="_blank"
          rel="noreferrer"
        >
          Github
        </a>
        <img
          className="about-me__img"
          src={authorPhoto}
          alt="Фотография разработчика"
        />
      </article>
      <Portfolio />
    </section>
  )
}

export default AboutMe