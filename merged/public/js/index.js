var autoScrolledTimer = 0;
var emptyCart = true;
var cmd = [];
var pizza_cpr = "";


//$('body').scrollspy({ target: '#navspied' }); TODO FIX

function clickScroll(n) {
    document.getElementById(n).scrollIntoView({
        behavior: 'smooth',
    });
    autoScrolledTimer = Date.now();
}

function carouselClick(c) {
    if (c != null) {
        //alert(c);
        mod = document.getElementById(c);

        let myModal = new bootstrap.Modal(document.getElementById(c), {});
        myModal.show();
    }

}



document.addEventListener("DOMContentLoaded", function () {
    el_autohide = document.querySelector('.autohide');

    navbar_height = document.querySelector('.navbar').offsetHeight;
    document.body.style.paddingTop = navbar_height + 'px';

    if (el_autohide) {
        var last_scroll_top = 0;
        window.addEventListener('scroll', function () {
            let scroll_top = window.scrollY;
            if (scroll_top < last_scroll_top) {
                el_autohide.classList.remove('scrolled-down');
                el_autohide.classList.add('scrolled-up');
            } else if (autoScrolledTimer + 1000 < Date.now()) {
                el_autohide.classList.remove('scrolled-up');
                el_autohide.classList.add('scrolled-down');
            }
            last_scroll_top = scroll_top;
        });
        // window.addEventListener
    }
    // if
    var elements = document.getElementsByClassName("add-to-cart");
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', function () {
            event.preventDefault();
            var name = $(this).data('name');
            var price = Number($(this).data('price'));

            shoppingCart.addItemToCart(name, price, 1);
            displayCart();
        });
    }

    function pizza_cp(id, ingred) {
        this.id = id;
        this.ingred = ingred;
    }


    var elements_cp = document.getElementsByClassName("add-to-cart_cp");
    for (var i = 0; i < elements_cp.length; i++) {
        elements_cp[i].addEventListener('click', function () {
            event.preventDefault();
            var name = $(this).data('name');
            var price = Number($(this).data('price'));






            shoppingCart.addItemToCart(name, price, 1);
            displayCart();



        });

    }
    var id = 0;
    var ingred = [];
    var elements_cp = document.getElementsByClassName("add-to-cart_cp");
    for (var i = 0; i < elements_cp.length; i++) {
        elements_cp[i].addEventListener('click', function () {
            document.getElementById("cpm").disabled = false;

            var name = $(this).data('name');
            ingred.push(name);

        })
    }
    $('#cpm').click(function () {
        var m = new pizza_cp(id, ingred);

        cmd.push(m);
        id++;

        ingred = [];
        console.log(cmd);


    });


    $('.show-cart').on("click", ".delete-item", function (event) {
        var name = $(this).data('name')
        shoppingCart.removeItemFromCartAll(name);
        displayCart();
        displayCartModal();
    })


    // -1
    $('.show-cart').on("click", ".minus-item", function (event) {
        var name = $(this).data('name')
        shoppingCart.removeItemFromCart(name);
        displayCart();
        displayCartModal();
    })
    // +1
    $('.show-cart').on("click", ".plus-item", function (event) {
        var name = $(this).data('name')
        shoppingCart.addItemToCart(name);
        displayCart();
        displayCartModal();
    })

    // Item count input
    $('.show-cart').on("change", ".item-count", function (event) {
        var name = $(this).data('name');
        var count = Number($(this).val());
        shoppingCart.setCountForItem(name, count);
        displayCart();
        displayCartModal();
    });



});
// DOMContentLoaded 

/*
$(document).ready(function () {
    // Add scrollspy to <body>
    $('body').scrollspy({
        target: ".navbar",
        offset: 50
    });
});
*/ // TODO FIX

function onclick(e) {
    entree.set(e,);
}



/*
// Add smooth scrolling on all links inside the navbar
$("#myNavbar a").on('click', function (event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
        // Prevent default anchor click behavior
        event.preventDefault();
        
        // Store hash
        var hash = this.hash;
        
        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 800, function () {
            
            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
        });
    }
});
});
*/

// ************************************************
// Shopping Cart API
// ************************************************

var shoppingCart = (function () {
    // =============================
    // Private methods and propeties
    // =============================
    cart = [];

    // Constructor
    function Item(name, price, count) {
        this.name = name;
        this.price = price;
        this.count = count;
    }

    // Save cart
    function saveCart() {
        sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
    }

    // Load cart
    function loadCart() {
        cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
        emptyCart = false;
    }
    if (sessionStorage.getItem("shoppingCart") != null) {
        loadCart();
    }


    // =============================
    // Public methods and propeties
    // =============================
    var obj = {};

    // Add to cart
    obj.addItemToCart = function (name, price, count) {
        emptyCart = false;
        for (var item in cart) {
            if (cart[item].name === name) {
                cart[item].count++;
                saveCart();
                return;
            }
        }
        var item = new Item(name, price, count);
        cart.push(item);
        saveCart();
    }




    // Set count from item
    obj.setCountForItem = function (name, count) {
        for (var i in cart) {
            if (cart[i].name === name) {
                cart[i].count = count;
                break;
            }

        }
    };

    // Remove item from cart
    obj.removeItemFromCart = function (name) {
        for (var item in cart) {
            if (cart[item].name === name) {
                cart[item].count--;
                if (cart[item].count === 0) {
                    cart.splice(item, 1);
                }
                break;
            }
        }
        saveCart();
    }

    // Remove all items from cart
    obj.removeItemFromCartAll = function (name) {
        for (var item in cart) {
            if (cart[item].name === name) {
                cart.splice(item, 1);
                break;
            }
        }
        saveCart();
    }

    // Clear cart
    obj.clearCart = function () {
        cart = [];
        saveCart();
        emptyCart = true;
    }

    // Count cart 
    obj.totalCount = function () {
        var totalCount = 0;
        for (var item in cart) {
            totalCount += cart[item].count;
        }
        if (totalCount === 0) {
            emptyCart = true;
        } else {
            emptyCart = false;
        }
        return totalCount;
    }

    // Total cart
    obj.totalCart = function () {
        var totalCart = 0;
        for (var item in cart) {
            totalCart += cart[item].price * cart[item].count;
        }
        return Number(totalCart.toFixed(2));
    }

    // List cart
    obj.listCart = function () {
        var cartCopy = [];
        for (i in cart) {
            item = cart[i];
            itemCopy = {};
            for (p in item) {
                itemCopy[p] = item[p];

            }
            itemCopy.total = Number(item.price * item.count).toFixed(2);
            cartCopy.push(itemCopy)
        }
        return cartCopy;
    }

    // cart : Array
    // Item : Object/Class
    // addItemToCart : Function
    // removeItemFromCart : Function
    // removeItemFromCartAll : Function
    // clearCart : Function
    // countCart : Function
    // totalCart : Function
    // listCart : Function
    // saveCart : Function
    // loadCart : Function
    return obj;
})();

// *****************************************
// Triggers / Events
// ***************************************** 
// Add item


function addToCart() {
    event.preventDefault();
    var name = $(this).data('name');
    var price = Number($(this).data('price'));
    displayCart();
}


// Clear items
$('.clear-cart').click(function () {
    shoppingCart.clearCart();
    displayCart();
});


function displayCart() {
    var cartArray = shoppingCart.listCart();
    var output = "";
    for (var i in cartArray) {
        output +=
            '<li class="list-group-item d-flex justify-content-between align-items-center">' +
            cartArray[i].name +
            '<span class="badge badge-primary badge-pill"> ' + cartArray[i].count + ' X ' + cartArray[i].price + ' : ' + cartArray[i].count * cartArray[i].price + ' € </span></li>'

    }
    $('.show-cart-drop').html(output);
    $('.total-cart-drop').html(shoppingCart.totalCart());
    $('.total-count-drop').html(shoppingCart.totalCount());
}



function displayCartModal() {
    var cartArray = shoppingCart.listCart();
    var output = "";
    var pizza_cpr = "";

    for (var i in cartArray) {
        output += "<tr>" +
            "<td>" + cartArray[i].name + "</td>" +
            "<td>(" + cartArray[i].price + ")</td>" +
            "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" + cartArray[i].name + ">-</button>" +
            "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>" +
            "<button class='plus-item btn btn-primary input-group-addon' data-name=" + cartArray[i].name + ">+</button></div></td>" +
            "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>" +
            " = " +
            "</tr>";

    }
    for (var i in cmd) {
        pizza_cpr += "<tr>" + "<td>" + cmd[i].id + ":" + cmd[i].ingred + "</td></tr>" + "<br>";
    }



    $('.show-cart').html(pizza_cpr);

    $('.total-cart').html(shoppingCart.totalCart());
    $('.total-count').html(shoppingCart.totalCount());

}

// Delete item button

$('.show-cart').on("click", ".delete-item", function (event) {
    var name = $(this).data('name')
    shoppingCart.removeItemFromCartAll(name);
    displayCart();

})


// -1
$('.show-cart').on("click", ".minus-item", function (event) {
    var name = $(this).data('name')
    shoppingCart.removeItemFromCart(name);
    displayCart();
})
// +1
$('.show-cart').on("click", ".plus-item", function (event) {
    var name = $(this).data('name')
    shoppingCart.addItemToCart(name);
    displayCart();
})

// Item count input
$('.show-cart').on("change", ".item-count", function (event) {
    var name = $(this).data('name');
    var count = Number($(this).val());
    shoppingCart.setCountForItem(name, count);
    displayCart();
});

displayCart();


$(document).ready(function () {

    //For Card Number formatted input
    var cardNum = document.getElementById('cr_no');
    cardNum.onkeyup = function (e) {
        if (this.value == this.lastValue) return;
        var caretPosition = this.selectionStart;
        var sanitizedValue = this.value.replace(/[^0-9]/gi, '');
        var parts = [];

        for (var i = 0, len = sanitizedValue.length; i < len; i += 4) {
            parts.push(sanitizedValue.substring(i, i + 4));
        }

        for (var i = caretPosition - 1; i >= 0; i--) {
            var c = this.value[i];
            if (c < '0' || c > '9') {
                caretPosition--;
            }
        }
        caretPosition += Math.floor(caretPosition / 4);

        this.value = this.lastValue = parts.join(' ');
        this.selectionStart = this.selectionEnd = caretPosition;
    }

    //For Date formatted input
    var expDate = document.getElementById('exp');
    expDate.onkeyup = function (e) {
        if (this.value == this.lastValue) return;
        var caretPosition = this.selectionStart;
        var sanitizedValue = this.value.replace(/[^0-9]/gi, '');
        var parts = [];

        for (var i = 0, len = sanitizedValue.length; i < len; i += 2) {
            parts.push(sanitizedValue.substring(i, i + 2));
        }

        for (var i = caretPosition - 1; i >= 0; i--) {
            var c = this.value[i];
            if (c < '0' || c > '9') {
                caretPosition--;
            }
        }
        caretPosition += Math.floor(caretPosition / 2);

        this.value = this.lastValue = parts.join('/');
        this.selectionStart = this.selectionEnd = caretPosition;
    }

});