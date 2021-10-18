const navAccordion = document.querySelector(".nav-accordion");
const imageArrows = document.querySelectorAll(".img-arrow");
const closeMobileMenu = document.querySelector(".close-menu");
const closeDesktopImage = document.querySelector(".close-icon");
const mainProductImage = document.querySelector(".main-img");
const deleteBtn = document.querySelector(".delete-item");
const addToCartBtn = document.querySelector("#main-order-btn");
const basketIcon = document.querySelector(".basket-icon");
const quantityBtns = document.querySelectorAll(".label-icon");
const expandedDeskImgs = document.querySelectorAll(".expanded-img");
const productThumbnails = document.querySelectorAll(".product-img");

let imageCounter = 0;
let orderedValue = 0;

let productImages = [
  'images/image-product-1.jpg',
  'images/image-product-2.jpg',
  'images/image-product-3.jpg',
  'images/image-product-4.jpg'
]

navAccordion.addEventListener("click", mobileMenu);
closeDesktopImage.addEventListener("click", closeExpandedImage);
closeMobileMenu.addEventListener("click", mobileMenu);
mainProductImage.addEventListener("click", expandImages);
deleteBtn.addEventListener("click", removeOrderedItem)
basketIcon.addEventListener("click", showCartItems);
addToCartBtn.addEventListener("click", addToCart);
imageArrows.forEach((arrow) => arrow.addEventListener("click", imageSlideShow));
quantityBtns.forEach((btn) => btn.addEventListener("click", updateQuantity));
expandedDeskImgs.forEach((img) => img.addEventListener("click", updateDesktopImages));
productThumbnails.forEach((thumbnail) => thumbnail.addEventListener("click", updateImg));

function showCart(){
  let basketItems = document.querySelector(".basket-items-click");
  let mobileBasket = document.querySelector(".basket-items-click");
  let basketFullItems = document.querySelectorAll(".basket-full");
  let basketEmptyItem = document.querySelector(".empty-cart");
  let emptyCartInfo = document.querySelector(".empty-cart-p");

  if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    mobileBasket.classList.add("mobile-menu");
  }

  // if basket empty remove items and insert 'no items' text
  // else show items that user ordered

  if (orderedValue == 0){
    if (emptyCartInfo.classList.contains("hide-items")){
      emptyCartInfo.classList.remove("hide-items");
    }
    basketFullItems.forEach((item) => item.classList.add("hide-items"));
    basketEmptyItem.classList.remove("hide-items");
  }

  basketItems.classList.remove("basket-items");
  setTimeout(() => hideCart(basketItems, basketEmptyItem), 3000);
}

function mobileMenu(e){
  // remove display none from mobile menu items and bring them to forefront
  let menuFlexItem = document.querySelector(".menu-flex");
  let menuItems = document.querySelectorAll(".menu-items");

  if (e.target.classList.contains('nav-accordion')){
    menuItems.forEach((item) => item.classList.remove("hide-menu-items"));
    menuFlexItem.style.zIndex = "1000";
  }
  else{
    menuItems.forEach((item) => item.classList.add("hide-menu-items"));
    menuFlexItem.style.zIndex = "0";
  }

}

function expandImages(e){
  // Expand images on desktop only
  let desktopBackground = document.querySelector(".menu-width");
  let expandedImages = document.querySelector(".desktop-div");
  if(! /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    expandedImages.classList.remove("hide-desk-img");
    desktopBackground.classList.remove("hide-menu-items");
  }
}

function closeExpandedImage(e){
  let desktopBackground = document.querySelector(".menu-width");
  let expandedImages = document.querySelector(".desktop-div");
  expandedImages.classList.add("hide-desk-img");
  desktopBackground.classList.add("hide-menu-items");
}

function imageSlideShow(e){
  let mainImage = document.querySelector(".main-img");
  if (e.target.classList.contains("left-arrow")){
    if (imageCounter != 0){
      imageCounter -= 1
      mainImage.src = productImages[imageCounter];
    }

  }
  else if (imageCounter < 3){
    imageCounter += 1
    mainImage.src = productImages[imageCounter];
  }

}

function removeOrderedItem(e){
  orderedValue = 0;
  showCart();
}

function hideCart(basket, emptyItem=null){
  // emptyItem is the basket text shown when cart is empty.
  let mobileBasket = document.querySelector(".basket-items-click");
  basket.classList.add("basket-items");
  mobileBasket.classList.remove("mobile-menu");
  if (emptyItem != null) {
    emptyItem.classList.add("hide-items");
  }
}

function showCartItems(e){
  showCart();
}

function addToCart(e){
  let quantityInput = document.querySelector("#item-quantity");
  let basketOrder = document.querySelector(".basket-order");
  let totalBill = document.querySelector(".total-bill");
  let basketFullItems = document.querySelectorAll(".basket-full");
  let basketItems = document.querySelector(".basket-items-click");
  let basketEmptyItem = document.querySelector(".empty-cart-p");

  if (Number(quantityInput.value) != 0){
    if (orderedValue == 0){
      orderedValue = Number(quantityInput.value)
    }
    else{
      orderedValue =+ Number(quantityInput.value)
    }

    orderTotal = (orderedValue * 125).toFixed(2);
    basketOrder.innerHTML = `$125.00 * ${orderedValue}`;
    totalBill.innerHTML = `$${orderTotal.toString()}`;
    basketFullItems.forEach((item) => item.classList.remove("hide-items"));

    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
      basketItems.classList.add("mobile-menu");
    }

    basketEmptyItem.classList.add("hide-items");
    basketItems.classList.remove("basket-items");
    setTimeout(() => hideCart(basketItems), 3000);
  }
}

function updateQuantity(e){
  let quantityInput = document.querySelector("#item-quantity");

  if (e.target.id == "minus-icon"){
    if (quantityInput.value > 0){
      quantityInput.value = Number(quantityInput.value) - 1;
    }
  }
  else{
    quantityInput.value = Number(quantityInput.value) + 1;
  }
}

function updateImg(e){
  // Get the id of the thumbnail clicked on.
  // Replace the main image with the image path for the thumbnail id

  let imageClasses = Array(e.target.classList);
  let thumbnailID = parseInt(e.target.id);
  imageCounter = thumbnailID;
  let mainImage = document.querySelector(".main-img");

  if (!imageClasses.includes("expanded-img")){
    if (mainImage.src.split('-main/') != productImages[thumbnailID]){
      mainImage.src = productImages[thumbnailID];
    }
    if (!imageClasses.includes('selected-img')){
      let prevSelectedImg = document.querySelector(".selected-img");
      prevSelectedImg.classList.remove("selected-img");
      e.target.classList.add("selected-img");
    }
  }
}

function updateDesktopImages(e){
  let imageDeskClasses = Array(e.target.classList);
  let mainImgDesktop = document.querySelector(".main-img-desktop");
  let thumbnailDeskID = parseInt(e.target.id);

  if (mainImgDesktop.src.split('-main/') != productImages[thumbnailDeskID]){
    mainImgDesktop.src = productImages[thumbnailDeskID];
  }

  if (!imageDeskClasses.includes('selected-img-desk')){
    let prevSelectedDeskImg = document.querySelector(".selected-img-desk");
    prevSelectedDeskImg.classList.remove("selected-img-desk");
    e.target.classList.add("selected-img-desk");
  }

}
