import { ChangeEvent, ChangeEventHandler, FC, useState } from "react";
import styles from "./create-product-page.module.css";
import { Category, TCreateProductData } from "../../utils/types";
import { createProduct } from "../../slices/products-slice";
import { useDispatch } from "../../app/store";
import { Error } from "../../components/error/Error";
import { useNavigate } from "react-router-dom";
import { TCreateProductResponse } from "../../utils/products-api";

export const CreateProductPage: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [checkedCategory, setCheckedCategory] = useState<Category>();
  const regexUrlValidation =
    /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/gm;

  const onCategoryChanged = (evt: any) => {
    setCheckedCategory(evt.target.value);
  };

  const onSubmit = (evt: any) => {
    evt.preventDefault();
    if (errorTextName !== '' || errorTextDescription !== '' || errorTextImageUrl !== '') {
      return;
    }
    const elements = evt.currentTarget.elements;
    const name = elements.name.value;
    const description = elements.description.value;
    const imageUrl = elements.image.value;
    const category = (() => {
      switch (checkedCategory) {
        case Category.SWEET:
          return "Сладкое";
        case Category.SALTY:
          return "Соленое";
        case Category.SOUR:
          return "Кислое";
        default:
          return "Сладкое"; // !
      }
    })();

    const product: TCreateProductData = {
      name: name,
      category: category,
      description: description,
      image: imageUrl,
      isLiked: false,
    };
    dispatch(createProduct(product)).then((data) => {
      const product = data.payload as TCreateProductResponse;
      navigate(`../products/${product.id}`, {replace: true});
    });
  };

  const [errorTextName, setErrorTextName] = useState('');
  const [errorTextDescription, setErrorTextDescription] = useState('');
  const [errorTextImageUrl, setErrorTextImageUrl] = useState('');

  const handleChangeName = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.value.length < 3 || evt.target.value.length > 12) {
      setErrorTextName('Название должно быть от 3 до 12 символов');
    } else {
      setErrorTextName('');
    }
  };

  const handleChangeDescription = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    if (evt.target.value.length < 25) {
      setErrorTextDescription('Описание должно быть от 25 символов');
    } else {
      setErrorTextDescription('');
    }
  };

  const handleChangeImage = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (!regexUrlValidation.test(evt.target.value)) {
      setErrorTextImageUrl('Введите корректную ссылку');
    } else {
      setErrorTextImageUrl('');
    }
  }

  return (
    <>
      <main className={styles.main}>
        <div>
          <h1>Создание продукта</h1>
          <form className={styles.form} onSubmit={onSubmit}>
            <label>Название продукта:</label>
            <input
              onChange={handleChangeName}
              className={styles["input-name"]}
              required
              type="text"
              name="name"
              id="name"
              placeholder="Введите название продукта"
              maxLength={12}
              minLength={3}
            />
            {errorTextName !== '' && <Error text={errorTextName}></Error>}
            <label>Описание продукта:</label>
            <textarea
              onChange={handleChangeDescription}
              className={styles["input-description"]}
              required
              name="description"
              id="description"
              placeholder="Введите описание продукта"
              minLength={25}
              maxLength={660}
            />
            {errorTextDescription !== '' && <Error text={errorTextDescription}></Error>}
            <div>
              <input
                required
                type="radio"
                id="sweet"
                name="category"
                value="SWEET"
                checked={checkedCategory === Category.SWEET}
                onChange={onCategoryChanged}
              />
              <label htmlFor="sweet">Сладкое</label>
            </div>
            <div>
              <input
                required
                type="radio"
                id="sour"
                name="category"
                value="SOUR"
                checked={checkedCategory === Category.SOUR}
                onChange={onCategoryChanged}
              />
              <label htmlFor="sour">Кислое</label>
            </div>
            <div>
              <input
                required
                type="radio"
                id="salty"
                name="category"
                value="SALTY"
                checked={checkedCategory === Category.SALTY}
                onChange={onCategoryChanged}
              />
              <label htmlFor="salty">Соленое</label>
            </div>

            <label>Ссылка на изображение:</label>
            <input
              onChange={handleChangeImage}
              className={styles["input-image"]}
              type="text"
              name="image"
              id="image"
              placeholder="Введите ссылку на изображение"
            />
            {errorTextImageUrl !== '' && <Error text={errorTextImageUrl}></Error>}
            <input className={styles.button} type="submit" value="Создать" />
          </form>
        </div>
      </main>
    </>
  );
};
