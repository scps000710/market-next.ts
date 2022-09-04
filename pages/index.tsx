import Header from '../components/index/Header';
import Hero from '../components/index/Hero';
import ItemList from '../components/item/ItemList';

const style = {
  wrapper: ``,
  connectButton: `border border-[#282b2f] bg-[#2081e2] p-[0.8rem] text-xl font-semibold rounded-lg cursor-pointer text-black`,
  details: `text-lg text-center text=[#282b2f] font-semibold mt-4`,
};

const Home = () => {
  return (
    <div className={style.wrapper}>
      <div>
        <Header />
        <Hero />
        <ItemList />
      </div>
    </div>
  );
};

export default Home;
