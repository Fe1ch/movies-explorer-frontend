import "./SectionTitle.css";

const SectionTitle = ({ title, className }) => {

  const classes = className ? `section-title ${className}` : 'section-title';

  return (
    <h2 className={classes} > {title}</h2 >
  )
}

export default SectionTitle;