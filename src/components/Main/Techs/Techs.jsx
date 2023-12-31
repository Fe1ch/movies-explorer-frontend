import './Techs.css';
import SectionTitle from "../SectionTitle/SectionTitle";

const Techs = () => {

  return (
    <section className="techs" id="techs">
      <SectionTitle className="techs__title" title="Технологии" />
      <div className="techs__content">
        <h3 className="techs__content-title">7 технологий</h3>
        <p className="techs__content-subtitle">
          На курсе веб-разработки мы освоили технологии, которые применили в<br />
          дипломном проекте.
        </p>
        <ul className="techs-list">
          <li className="techs-list__item">HTML</li>
          <li className="techs-list__item">CSS</li>
          <li className="techs-list__item">JS</li>
          <li className="techs-list__item">React</li>
          <li className="techs-list__item">Git</li>
          <li className="techs-list__item">Express.js</li>
          <li className="techs-list__item">MongoDB</li>
        </ul>
      </div>
    </section>
  );
}

export default Techs;