import { ReactNode } from "react";

interface ImageGridProps {
  children: ReactNode;
}

const ImageGrid: React.FC<ImageGridProps> = ({ children }) => (
  <div className="grid w-full grid-cols-3 overflow-hidden">{children}</div>
);

export default ImageGrid;
