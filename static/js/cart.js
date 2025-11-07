/* ========================================= */
/* "BỘ NÃO" QUẢN LÝ GIỎ HÀNG (localStorage)  */
/* ========================================= */

// Tên của "giỏ hàng" trong kho chứa trình duyệt
const CART_KEY = "phukien_cart"; 

/**
 * Lấy giỏ hàng hiện tại từ localStorage.
 * @returns {Array} Một mảng các sản phẩm trong giỏ.
 */
export function getCart() {
    const cartData = localStorage.getItem(CART_KEY);
    // Nếu không có giỏ hàng, trả về một mảng rỗng
    return cartData ? JSON.parse(cartData) : [];
}

/**
 * Lưu giỏ hàng mới vào localStorage.
 * @param {Array} cart - Mảng các sản phẩm cần lưu.
 */
function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

/**
 * Hàm chính: Thêm một sản phẩm vào giỏ hàng.
 * @param {object} product - Đối tượng sản phẩm (SKU, Name, Price, Image).
 */
export function addToCart(product) {
    let cart = getCart(); // Lấy giỏ hàng hiện tại

    // Kiểm tra xem sản phẩm này (dựa trên SKU) đã có trong giỏ chưa
    const existingProductIndex = cart.findIndex(item => item.sku === product.sku);

    if (existingProductIndex > -1) {
        // Nếu đã có: Chỉ tăng số lượng (quantity) lên 1
        cart[existingProductIndex].quantity += 1;
    } else {
        // Nếu chưa có: Thêm sản phẩm mới vào giỏ với số lượng là 1
        product.quantity = 1;
        cart.push(product);
    }

    // Lưu giỏ hàng đã cập nhật trở lại localStorage
    saveCart(cart);

    // Thông báo cho người dùng (bạn có thể đổi thành 1 popup đẹp hơn sau)
    alert(`Đã thêm "${product.name}" vào giỏ hàng!`);
}

/**
 * Xóa một sản phẩm khỏi giỏ hàng (dựa trên SKU).
 * @param {string} sku - Mã SKU của sản phẩm cần xóa.
 */
export function removeFromCart(sku) { 
    let cart = getCart();
    
    // Lọc ra một mảng mới, KHÔNG chứa sản phẩm có SKU bị xóa
    const newCart = cart.filter(item => item.sku !== sku);

    saveCart(newCart);
}

/**
 * Lấy tổng số lượng sản phẩm trong giỏ (để hiển thị trên icon).
 * @returns {number} Tổng số lượng.
 */
export function getCartItemCount() {
    let cart = getCart();
    let count = 0;
    cart.forEach(item => {
        count += item.quantity;
    });
    return count;
}