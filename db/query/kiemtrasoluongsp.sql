select * from receiptdetails
select * from products


WITH quantity_of_product AS (
    SELECT productDetailSizeId, SUM(quantity) AS total
    FROM receiptdetails
    GROUP BY productDetailSizeId
)
SELECT p.id, p.name, SUM(q.total) AS total
FROM products p
LEFT JOIN quantity_of_product q ON p.id = q.productDetailSizeId
GROUP BY p.id, p.name
ORDER BY p.id ASC;



