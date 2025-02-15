type Props = {
  onNavigate?: (arg: any) => void;
};

const AboutView = ({ onNavigate }: Props) => {
  return (
    <div className="se-info-container">
      <p className="small">
        Copyright © 2025, Abbey Learning Assesment for Abbey FullStack Engineer Challenge
      </p>
      <p className="small">
        Submission by{" "}
        <a
          href="https://www.linkedin.com/in/totxprex/"
          target="_blank"
          style={{ color: "Highlight" }}
          rel="noreferrer"
        >
          Tolulope Mumuney
        </a>
        , Fullstack Software Developer
      </p>
    </div>
  );
};

export default AboutView;
