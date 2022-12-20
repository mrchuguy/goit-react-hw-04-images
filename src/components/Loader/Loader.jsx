import MoonLoader from 'react-spinners/MoonLoader';
import { LoaderBackdrop } from './Loader.styled';

const override = {
  display: 'block',
};

export const Loader = () => {
  return (
    <LoaderBackdrop>
      <MoonLoader color="#d6d6d6" size={100} cssOverride={override} />;
    </LoaderBackdrop>
  );
};
