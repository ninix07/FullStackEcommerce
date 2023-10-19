import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./styles/home.scss";
import Product from "./product.js";
import MetaData from "../layout/metaData";
import { getProduct } from "../../actions/productAction";
import {useDispatch, useSelector } from "react-redux";
import Loader from "../layout/loader/Loader";
import { useAlert } from "react-alert";

const Home = () => {
  const alert=useAlert()
  const dispatch = useDispatch();
  const{loading, error, products}=useSelector(state=>state.products)
  useEffect(()=>{
    if(error){
      console.log("Hello")
      return alert.error(error)
    }
    dispatch(getProduct())
  },[dispatch,error,alert]);
  return (
    <Fragment >
      {loading? <Loader/>:<Fragment>
      <MetaData title="Ecommerce"/>
      <div className="Banner">
        <p>Welcome to Ecommerce</p>
        <h1>Find Amazing Products Below</h1>
        <a href="#container">
          <button>
            Scroll
            <CgMouse />
          </button>
        </a>
      </div>
      <h2 className="homeHeading">Featured Products</h2>
      <div className="container">
      {products && products.map(product=>(<Product product={product}/>))}
      </div>
    </Fragment>}
    </Fragment>
  );
};

export default Home;
