import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
const Cart = () => {
    return (
      
		 <>
     		 <Header/>
    <section className="cart">
  <div className="container">
    <article className="row cart__head pc">
      <nav className="menu__nav col-lg-3 col-md-12 col-sm-0">
        <ul className="menu__list">
          <li className="menu__item menu__item--active">
            <a href="#" className="menu__link">
              <img src="images1/item/baby-boy.png" alt className="menu__item-icon" id="Capa_1" enableBackground="new 0 0 512 512" height={512} viewbox="0 0 512 512" width={512} />
              Sách Tiếng Việt</a>
          </li>
          <li className="menu__item">
            <a href="#" className="menu__link">
              <img src="images1/item/translation.png" alt className="menu__item-icon" id="Capa_1" enableBackground="new 0 0 512 512" height={512} viewbox="0 0 512 512" width={512} />
              Sách nước ngoài</a>
          </li>
          <li className="menu__item">
            <a href="#" className="menu__link">
              <img src="images/item/1380754_batman_comic_hero_superhero_icon.png" alt className="menu__item-icon" viewbox="0 0 512 512" width={1012} height={512} />
              Manga - Comic</a>
          </li>
        </ul>
      </nav>
      <div className="col-6 cart__head-name">
        Thông tin sản phẩm
      </div>
      <div className="col-3 cart__head-quantity">
        Số lượng
      </div>
      <div className="col-3 cart__head-price">
        Đơn giá
      </div>
    </article>
    <article className="row cart__body">
      <div className="col-6 cart__body-name">
        <div className="cart__body-name-img">
          <img src="images1/product/8936049524905.jpg" />
        </div>
        <a href className="cart__body-name-title">
          5 Centimet Trên Giây
        </a>
      </div>
      <div className="col-3 cart__body-quantity">
        <input type="button" defaultValue="-" className="cart__body-quantity-minus" />
        <input type="number" step={1} min={1} max={999} defaultValue={1} className="cart__body-quantity-total" />
        <input type="button" defaultValue="+" className="cart__body-quantity-plus" />
      </div>
      <div className="col-3 cart__body-price">
        <span>39.500đ</span>
        <a href="#">Xóa</a>
      </div>
    </article>
    <article className="row cart__body">
      <div className="col-6 cart__body-name">
        <div className="cart__body-name-img">
          <img src="images1/product/untitled-1_9_25_1.jpg" />
        </div>
        <a href className="cart__body-name-title">
          Tôi Thích Bản Thân Nỗ Lực Hơn ( Tái bản 2019)
        </a>
      </div>
      <div className="col-3 cart__body-quantity">
        <input type="button" defaultValue="-" className="cart__body-quantity-minus" />
        <input type="number" step={1} min={1} max={999} defaultValue={2} className="cart__body-quantity-total" />
        <input type="button" defaultValue="+" className="cart__body-quantity-plus" />
      </div>
      <div className="col-3 cart__body-price">
        <span>76.800đ</span>
        <a href="#">Xóa</a>
      </div>
    </article>
    <article className="row cart__body">
      <div className="col-6 cart__body-name">
        <div className="cart__body-name-img">
          <img src="images1/product/8936186542176.jpg" />
        </div>
        <a href className="cart__body-name-title">
          Tôi Thích Một Cô Gái Nhưng Không Dám Ngỏ Lời
        </a>
      </div>
      <div className="col-3 cart__body-quantity">
        <input type="button" defaultValue="-" className="cart__body-quantity-minus" />
        <input type="number" step={1} min={1} max={999} defaultValue={1} className="cart__body-quantity-total" />
        <input type="button" defaultValue="+" className="cart__body-quantity-plus" />
      </div>
      <div className="col-3 cart__body-price">
        <span>70.000đ</span>
        <a href="#">Xóa</a>
      </div>
    </article>
    <article className="row cart__body">
      <div className="col-6 cart__body-name">
        <div className="cart__body-name-img">
          <img src="images1/product/biamem.jpg" />
        </div>
        <a href className="cart__body-name-title">
          Con Chim Xanh Biếc Bay Về - Tặng Kèm 6
        </a>
      </div>
      <div className="col-3 cart__body-quantity">
        <input type="button" defaultValue="-" className="cart__body-quantity-minus" />
        <input type="number" step={1} min={1} max={999} defaultValue={2} className="cart__body-quantity-total" />
        <input type="button" defaultValue="+" className="cart__body-quantity-plus" />
      </div>
      <div className="col-3 cart__body-price">
        <span>112.500đ</span>
        <a href="#">Xóa</a>
      </div>
    </article>
    <article className="row cart__foot">
      <div className="col-6 col-lg-6 col-sm-6 cart__foot-update">
        <button className="cart__foot-update-btn">Cập nhật giỏ hàng</button>
      </div>
      <p className="col-3 col-lg-3 col-sm-3 cart__foot-total">
        Tổng cộng: 
      </p>
      <span className="col-3 col-lg-3 col-sm-3 cart__foot-price">
        298.8000đ <br />
        <button className="cart__foot-price-btn">Mua hàng</button>
      </span>
    </article>
  </div>
</section>
<Footer/>
    </>);
}
 
export default Cart;