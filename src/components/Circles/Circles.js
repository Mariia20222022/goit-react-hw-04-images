import { Circles } from 'react-loader-spinner';
import css from './Circles.module.css';
export default function Loader() {
  return (
    <>
      <div className={css.circles}>
        <Circles
          height="140"
          width="140"
          color="#00BFFF"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    </>
  );
}
