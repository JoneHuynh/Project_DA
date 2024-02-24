import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import Productadmin from "./Pages/Admin/Product/Product";
import ProductAdd from "./Pages/Admin/Product/ProductAdd";
import ProductType from "./Pages/Admin/Product/ProductType";
import ProductTypeAdd from "./Pages/Admin/Product/ProductTypeAdd";
import Publisher from "./Pages/Admin/Publisher/Publisher";
import PublisherAdd from "./Pages/Admin/Publisher/PublisherAdd";
import ProductTypeEdit from "./Pages/Admin/Product/ProductTypeEdit";
import Login from "./Login/Login";
import Image from "./Pages/Admin/Image/Image";
import AddImage from "./Pages/Admin/Image/AddImage";
import Combo from "./Pages/Admin/Combo/Combo";
import ImageEdit from "./Pages/Admin/Image/ImageEdit";
import Account from "./Pages/Admin/Accounts/Account";
import ProductEdit from "./Pages/Admin/Product/ProductEdit";
import Paymethod from "./Pages/Admin/Pay/Paymethod";
import Card from "./Pages/Admin/Card/Card";
import Error404 from "./Component/Error404";
import CoverType from "./Pages/Admin/Covertype/CoverType";
import Product from "./Pages/User/Product/Products";
import KindBookList from "./Pages/Admin/KindBook/KindBookList";
import PublisherEdit from "./Pages/Admin/Publisher/Publiseredit";
import InvoiceList from "./Pages/Admin/Invoices/Invoice";
import InvoiceDetail from "./Pages/Admin/Invoices/InvoiceDetail";
import ComboEdit from "./Pages/Admin/Combo/ComboEdit";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/admin">
            <Route index element={<AdminDashboard />} />
            <Route path="product">
              <Route index element={<Productadmin />} />
              <Route path="create" element={<ProductAdd />} />
              <Route path="edit/:id" element={<ProductEdit />} />
            </Route>
            <Route path="producttype">
              <Route index element={<ProductType />} />
              <Route path="create" element={<ProductTypeAdd />} />
              <Route path="edit/:id" element={<ProductTypeEdit />} />
            </Route>
            <Route path="publisher">
              <Route index element={<Publisher />} />
              <Route path="create" element={<PublisherAdd />} />
              <Route path="edit/:id" element={<PublisherEdit />} />
            </Route>

            <Route path="images">
              <Route index element={<Image />} />
              <Route path="create" element={<AddImage />} />
              <Route path="edit/:id" element={<ImageEdit />} />
            </Route>
            <Route path="comboes">
              <Route index element={<Combo />} />
              <Route path="edit/:id" element={<ComboEdit />} />
            </Route>
            <Route path="account">
              <Route index element={<Account />} />
              {/* <Route path="create" element={<AddImage />} /> */}
            </Route>
            <Route path="Pay-method">
              <Route index element={<Paymethod />} />
            </Route>
            <Route path="Card">
              <Route index element={<Card />} />
            </Route>
            <Route path="Cover-Type">
              <Route index element={<CoverType />} />
            </Route>
            <Route path="Kind-book">
              <Route index element={<KindBookList />} />
            </Route>
            <Route path="Invoice">
              <Route index element={<InvoiceList />} />
              <Route path="details/:id" element={<InvoiceDetail />} />
            </Route>
          </Route>



          <Route path="/login">
            <Route index element={<Login />} />
          </Route>

          <Route path="/">
            <Route index element={<Product />} />
          </Route> 

          <Route path="/error404">
            <Route index element={<Error404 />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
