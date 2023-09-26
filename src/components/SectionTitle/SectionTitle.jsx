import "./SectionTitle.css";


const SectionTitle = ({ title, className }) => {
  return <h2 className={`section-title ${className}`} > {title}</h2 >;
}

export default SectionTitle;