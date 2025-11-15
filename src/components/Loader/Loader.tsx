import css from "./Loader.module.css";

export interface LoaderProps {
  small?: boolean;
}

export default function Loader({ small }: LoaderProps) {
  return (
    <div className={small ? css.spinnerSm : css.spinner} aria-label="Loading" />
  );
}
