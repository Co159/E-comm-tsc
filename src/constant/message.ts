const responseMessage = {
    server: {
        error: "Something went wrong !",
    },
    status: {
        success: "Success",
        error: "Error",
    },
    user: {
        registerSuccess: "User register successfully !",
        loginSuccess: "Sent OTP on your email successfully !",
        notFound: "User not find !",
        userExists: "User already exists !",
        invalidCredentials: "Invalid credentials !",
        invalidOTP: "Invalid or expire OTP !",
        verifyOTP: "OTP verified, account activated !",
        tokenNotProvide: "Token not Provide !",
        invalidToken: "Invalid or Expire toekn !",
        notAccess: "Access denied !"
    },
    Product: {
        createProduct: "Product Created Successfully !",
        updateProduct: "Product Updated Successfully !",
        deleteProduct: "Product Deleted Successfully !",
        getProduct: "Product data fetched !",
        notFound: "Product Not Found !",
    },
    Cart: {
        addCart: "Product add in cart successfully !",
        getCart: "Product in cart details !",
        notProduct: "Cart in not any product !",
        removeProduct: "Remove product from the cart !",
    },
    Order: {
        addOrder: "Order added successfully !",
        getOrder: "Order details fetched !",
        notOrder: "Order in not any product !",
    },
}

export default responseMessage;