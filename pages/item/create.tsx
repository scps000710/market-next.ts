/* eslint-disable @next/next/no-img-element */
import Header from '../../components/index/Header';
import { useState, useRef } from 'react';
import CreateInput from '../../components/item/createInput';
import { createItem, createImage } from '../../utils/agent';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';

const style = {
  wrapper: `flex flex-col py-4 items-center container-lg text-[#e5e8eb]`,
  formContainer: `flex flex-col`,
  img: `max-w-[400px] max-h-[400px]`,
  imgUpload: `relative font-semibold mt-2 px-6 py-3 bg-[#2181e2] rounded-lg text-white hover:bg-[#42a0ff] cursor-pointer`,
  createButton: `relative font-semibold px-6 py-3 bg-[#2181e2] rounded-lg text-white hover:bg-[#42a0ff] cursor-pointer`,
};

const CreateItemPage = () => {
  const [item, setItem] = useState({
    imageSrc: '',
    title: '',
    price: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const createSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { imageSrc, title, price } = item;
    if (!imageSrc || !title || !price) {
      Swal.fire({
        title: '請完整填寫',
        confirmButtonText: '確定',
        confirmButtonColor: '#2181e2',
        icon: 'info',
      });
      return;
    }
    (async () => {
      const itemResult = await createItem(title, price);
      if (itemResult.status === 200) {
        const formData = new FormData();
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        formData.append('file', file!);
        formData.append('itemId', itemResult.data.itemId);
        const imageResult = await createImage(formData);
        if (imageResult.status === 200) {
          Swal.fire({
            title: '商品創建成功',
            text: '由於沒有資料庫，此為假上傳。',
            confirmButtonText: '下一步',
            confirmButtonColor: '#2181e2',
            icon: 'success',
          }).then(() => {
            router.push('/');
          });
        }
      }
    })();
    return;
  };

  const changeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    setFile(e.target.files[0]);
    setItem({
      ...item,
      imageSrc: URL.createObjectURL(e.target.files[0]),
    });
  };

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItem({
      ...item,
      title: e.target.value,
    });
  };

  const onPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItem({
      ...item,
      price: e.target.value,
    });
  };

  return (
    <div>
      <Header />

      <div className={style.wrapper}>
        <img src={item.imageSrc} alt="" className={style.img} />
        <button
          onClick={() => {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            fileInput.current!.click();
          }}
          className={style.imgUpload}
        >
          上傳圖片
        </button>
        <form
          onSubmit={(e) => {
            createSubmit(e);
          }}
          className={style.formContainer}
        >
          <input
            type="file"
            ref={fileInput}
            onChange={(e) => {
              changeImage(e);
            }}
            accept="image/png, image/jpeg"
            hidden
          />
          <CreateInput
            type="text"
            title="標題"
            value={item.title}
            placeholder="標題"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onTitleChange(e)
            }
          />
          <CreateInput
            type="number"
            title="價錢"
            value={item.price}
            placeholder="價錢"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onPriceChange(e)
            }
          />
          <input
            className={style.createButton}
            type="submit"
            value="創建商品"
          />
        </form>
      </div>
    </div>
  );
};

export default CreateItemPage;
