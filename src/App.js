// import logo from "";
// 


function App() {
  return (
    <div className="wrapper">

      <header className="header">

        {/* ------------------------------------------------------ */}
        <div className="header__logo logo">

          <img
            // src={logo}
            src="./img/perfume-7686483-6210505.webp"
            className="logo__img" />

          <div className="logo__text">
            <h3 className="logo__title">perfume</h3>
            <p className="logo__subtitle">best ever perfume online-store</p>
          </div>

        </div>

        {/* ------------------------------------------------------ */}
        <nav className="header__menu menu">
          <ul className="menu__list">

            <li className="menu__item">
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" /></svg>
              <span>10$</span>
            </li>

            <li className="menu__item">
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" /></svg>
            </li>

          </ul>
        </nav>
      </header>
      {/* ------------------------------------------------------ */}

      <section className="goods">
        <h3 className="goods__title">All perfumes</h3>
        <div className="goods__cards">

          <div className="goods__card card">
            <div className="card__img">
              <img
                width={133}
                height={112}
                src="./img/goods/1.jpg" alt="item" />
            </div>
            <div className="card__body">
              <p className="card__model">Male fragrance</p>
              <div className="card__bottom">
                <div className="card__price">
                  <span >Price</span>
                  <p>10.00$</p>
                </div>
                <button className="card__add" type="">
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" /></svg>
                </button>
              </div>
            </div>
          </div>
          <div className="goods__card card">
            <div className="card__img">
              <img
                width={133}
                height={112}
                src="./img/goods/1.jpg" alt="item" />
            </div>
            <div className="card__body">
              <p className="card__model">Male fragrance</p>
              <div className="card__bottom">
                <div className="card__price">
                  <span >Price</span>
                  <p>10.00$</p>
                </div>
                <button className="card__add" type="">
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" /></svg>
                </button>
              </div>
            </div>
          </div>
          <div className="goods__card card">
            <div className="card__img">
              <img
                width={133}
                height={112}
                src="./img/goods/1.jpg" alt="item" />
            </div>
            <div className="card__body">
              <p className="card__model">Male fragrance</p>
              <div className="card__bottom">
                <div className="card__price">
                  <span >Price</span>
                  <p>10.00$</p>
                </div>
                <button className="card__add" type="">
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" /></svg>
                </button>
              </div>
            </div>
          </div>
          <div className="goods__card card">
            <div className="card__img">
              <img
                width={133}
                height={112}
                src="./img/goods/1.jpg" alt="item" />
            </div>
            <div className="card__body">
              <p className="card__model">Male fragrance</p>
              <div className="card__bottom">
                <div className="card__price">
                  <span >Price</span>
                  <p>10.00$</p>
                </div>
                <button className="card__add" type="">
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" /></svg>
                </button>
              </div>
            </div>
          </div>

       

        </div>
      </section>

    </div>
  );
}

export default App;
