import { ReactNode } from "react";

interface ImageGridProps {
  children: ReactNode;
}

const ImageGrid: React.FC<ImageGridProps> = ({ children }) => (
  <div className="grid w-full grid-cols-3 gap-1 overflow-hidden lg:grid-cols-4">
    {children}
  </div>
);

export default ImageGrid;
