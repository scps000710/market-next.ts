import { IconType } from 'react-icons/lib';

const style = {
  ssoContainer: `w-full outline outline-2 outline-[#00000026] py-2 pr-4 my-4  rounded-full text-black flex flex-row hover:shadow-lg `,
  ssoIcon: `text-2xl font-black px-4 cursor-pointer`,
  ssoText: `text-xl mx-auto`,
};

const SsoButton = (props: { icon: IconType; text: string }) => {
  return (
    <button className={style.ssoContainer}>
      <div className={style.ssoIcon}>
        <props.icon />
      </div>
      <div className={style.ssoText}>{props.text}</div>
    </button>
  );
};

export default SsoButton;
