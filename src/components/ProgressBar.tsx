interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => (
  <div
    style={{ width: progress + "%" }}
    className={`h-1 self-start bg-sky-400`}
  ></div>
);

export default ProgressBar;
