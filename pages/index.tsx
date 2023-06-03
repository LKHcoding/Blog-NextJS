import AllPostCardList from './../components/index/AllPostCardList';
import CustomHeader from '../components/common/SEO/CustomHeader';

const Home = () => {
  return (
    <>
      <CustomHeader />
      <div>
        <AllPostCardList />
      </div>
    </>
  );
};

export default Home;
