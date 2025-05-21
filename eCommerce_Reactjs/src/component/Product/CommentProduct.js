import React from 'react';

function CommentProduct(props) {
    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="comment_list">
                    <div className="review_item">
                        <div className="media">
                            <div className="d-flex">
                                <img src="https://technext.github.io/eiser/img/product/single-product/review-1.png" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="review_item reply">
                        <div className="media">
                            <div className="d-flex">
                                <img src="https://technext.github.io/eiser/img/product/single-product/review-1.png" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="review_item">
                        <div className="media">
                            <div className="d-flex">
                                <img src="https://technext.github.io/eiser/img/product/single-product/review-1.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default CommentProduct;