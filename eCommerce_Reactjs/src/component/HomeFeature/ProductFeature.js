import React, { useEffect, useState } from 'react';
import ItemProduct from '../Product/ItemProduct';
import HeaderContent from '../Content/HeaderContent';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './ProductFeature.scss';
import { getProductFeatureService } from '../../services/userService';
function ProductFeature(props) {
    // Tính số lượng slide hiển thị phù hợp
    const productCount = props.data && props.data.length > 0 ? props.data.length : 4;
    let settings = {
        dots: false,
        Infinity: false,
        speed: 500,
        slidesToShow: productCount < 4 ? productCount : 4,
        slidesToScroll: 1,
    }

    return (

        <section className="feature_product_area section_gap_bottom_custom">
            <div className="container">
                <HeaderContent mainContent={props.title}
                    infoContent="Bạn sẽ không thất vọng khi lựa chọn"> </HeaderContent>

                <div className="row box-productFeature">
                    <Slider {...settings}>
                        {props.data && props.data.length > 0 &&
                            props.data.map((item, index) => {
                                return (
                                    <ItemProduct id={item.id} key={index} width={350} height={419} type="col-lg-4 col-md-6" name={item.name} img={item.productDetail[0].productImage[0].image}
                                        price={item.productDetail[0].originalPrice} discountPrice={item.productDetail[0].discountPrice}>
                                    </ItemProduct>
                                )
                            })
                        }
                    </Slider>
                </div>
            </div>
        </section>
    );
}

export default ProductFeature;