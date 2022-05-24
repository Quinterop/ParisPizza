var autoScrolledTimer = 0;
var emptyCart = true;
var cmd = [];
var pizza_cpr = "";
var SAVED = "";
var ingredList = [];

//$('body').scrollspy({ target: '#navspied' }); TODO FIX
//le scroll de la page
function clickScroll(n) {
    document.getElementById(n).scrollIntoView({
        behavior: 'smooth',
    });
    autoScrolledTimer = Date.now();
}

function carouselClick(c) {
    if (c != null) {
        ////alert(c);
        mod = document.getElementById(c);

        let myModal = new bootstrap.Modal(document.getElementById(c), {});
        myModal.show();
    }

}



document.addEventListener("DOMContentLoaded", function() {
    var preIngreds = null;
    el_autohide = document.querySelector('.autohide');
    if (window.location.pathname.includes('compose')) {
        ////alert('compose');
        var saved = shoppingCart.getCustomPizza();
        console.log(saved);
        SAVED = saved;
        //console.log(SAVED);

        var defPizzArr = SAVED.split(',');
        for (var i = 0; i < defPizzArr.length; i++) {
            console.log(defPizzArr[i]);
            var ing = document.getElementById(defPizzArr[i]);
            if (ing != null) {
                console.log(ing.id);
                ing.value = 1;
            } else {
                console.log(ing);
            }
        }
        //when any input changes, update the total
        document.querySelectorAll('.ingred').forEach(function(el) {
            el.addEventListener('change', function() {
                updateTotal();
                //console.log(el.id);
            });
        });

        updateTotal();
    }





    navbar_height = document.querySelector('.navbar').offsetHeight;
    document.body.style.paddingTop = navbar_height + 'px';

    if (el_autohide) {
        var last_scroll_top = 0;
        window.addEventListener('scroll', function() {
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

    //Ajouter au panier 
    var elements = document.getElementsByClassName("add-to-cart");

    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', function() {
            event.preventDefault();
            var name = $(this).data('name');
            var price = Number($(this).data('price'));
            var amount = document.getElementById(name).value;


            if (amount == null) {
                //alert("amount nulle");
            }
            ////alert(name + " " + price + " " + amount);
            if (amount == 0) {
                amount = 1;
            }
            if (name.includes("Pizza")) {
                var taille = document.getElementById('taille' + name).value;
                var pate = document.getElementById('pate' + name).value;
                console.log(pate);
                console.log('pate' + name);
                console.log(name);
                if (taille.includes("large")) {
                    price = Math.round(price * 1.5);
                }
                if (pate.includes("fine")) {
                    price = Math.round(price * 0.9);
                }
                shoppingCart.addItemToCart(name, price, amount, taille, pate);

            } else {
                shoppingCart.addItemToCart(name, price, amount, null, null);
            }
            displayCart();
            console.log('click');
        });
    }
    //Ajouter les pizzas composées
    var customElements = document.getElementsByClassName("addCustom");
    for (var i = 0; i < customElements.length; i++) {
        customElements[i].addEventListener('click', function() {
            var content = $(this).data('content');
            shoppingCart.defPizz = content;
            //console.log(shoppingCart.defPizz);
            shoppingCart.saveCart(content);
            console.log(content);
            console.log(shoppingCart.defPizz);
        });
    }

    function pizza_cp(id, ingred) {
        this.id = id;
        this.ingred = ingred;
    }

    //
    var elements_cp = document.getElementsByClassName("add-to-cart_cp");
    for (var i = 0; i < elements_cp.length; i++) {
        elements_cp[i].addEventListener('click', function() {
            nb++;
            event.preventDefault();
            var name = $(this).data('name');
            var price = Number($(this).data('price'));



            shoppingCart.addItemToCart(name, price, 1);
            displayCart();

        });


    }

    /*function ing(name, price) {
        this.name = name;
        this.price = price;
        
    }*/



    var id = 0;
    var ingred = [];
    var elements_cp = document.getElementsByClassName("add-to-cart_cp");
    for (var i = 0; i < elements_cp.length; i++) {
        elements_cp[i].addEventListener('click', function() {


            var name = $(this).data('name');

            ingred.push(name);

        })
    }
    $('#cpm').click(function() {
        // alert('click');
        //var m = new pizza_cp(id, ingred);
        //var p = new Item
        //cmd.push(m);
        //id++;
        var elems = ingredList;
        //elems.unshift(document.querySelector('input[name="sauce"]:checked').value);
        console.log(elems);

        var price = updateTotal();
        //var size = document.getElementById('taille' + name).value;
        var taille = document.querySelector('input[name="taille"]:checked').value
        var pate = document.querySelector('input[name="pate"]:checked').value
            //GET PATE
            //var item = new Item("Pizza Custom", price, 1, taille, pate, null);
        shoppingCart.addItemToCart("Pizza Custom", price, 1, taille, pate, null, elems);
    });


    //Supprimer un item du panier
    $('.show-cart').on("click", ".delete-item", function(event) {
        var name = $(this).data('name')
        shoppingCart.removeItemFromCartAll(name);
        displayCart();
        displayCartModal();
    })


    // -1
    $('.show-cart').on("click", ".minus-item", function(event) {
            var name = $(this).data('name');
            shoppingCart.removeItemFromCart(name);
            displayCart();
            displayCartModal();
        })
        // +1
    $('.show-cart').on("click", ".plus-item", function(event) {
        console.log("plus");
        var name = $(this).data('name');
        shoppingCart.addItemToCart(name);
        displayCart();
        displayCartModal();
    })

    // Compter le nombre d'un item
    $('.show-cart').on("change", ".item-count", function(event) {
        var name = $(this).data('name');
        var count = Number($(this).val());
        shoppingCart.setCountForItem(name, count);
        displayCart();
        displayCartModal();
    });
    //Ajouter les menus
    $('.addmenu').click(function() {

        var elements = [];
        var nom = document.getElementById("menuNom").textContent;
        var prix = document.getElementById("menuPrix").textContent;
        var pizz = document.getElementById("menuPizz");
        var boisson = document.getElementById("menuBoisson");
        var entree = document.getElementById("menuEntree");
        //elements.push(pizz.value);
        //elements.push(boisson.value);
        //elements.push(entree.value);
        console.log(nom);
        //remove last char of prix
        prix = prix.substring(0, prix.length - 1);
        console.log(prix);
        console.log(elements);
        shoppingCart.addItemToCart(nom, prix, 1, null, null, elements);
    });

    $('#addmenu').click(function() {

        var elements = [];
        var nom = document.getElementById("menuNom").textContent;
        var prix = document.getElementById("menuPrix").textContent;
        elements.push(document.getElementById("menuPizz").value);
        elements.push(document.getElementById("menuBoisson").value);
        elements.push(document.getElementById("menuEntree").value);
        console.log(nom);
        console.log(prix);
        console.log(elements);
        shoppingCart.addItemToCart(nom, prix, 1, null, null, elements);
    });


    $('.minus').click(function() {
        var $input = $(this).parent().find('input');
        var count = parseInt($input.val()) - 1;
        count = count < 1 ? 1 : count;
        $input.val(count);
        $input.change();
        return false;
    });
    $('.plus').click(function() {
        var $input = $(this).parent().find('input');
        $input.val(parseInt($input.val()) + 1);
        $input.change();
        return false;
    });


    displayCart();
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
    entree.set(e, );
}
//MAJ au prix total
function updateTotal() {
    allIngreds = document.getElementsByClassName('ingred');

    totalPrice = 8;
    if (document.querySelector('input[name="taille"]:checked').value == "Large") {
        totalPrice += 2;
    }
    if (document.querySelector('input[name="pate"]:checked').value == "Fine") {
        totalPrice -= 1;
    }
    for (var i = 0; i < allIngreds.length; i++) {
        nbingreds = allIngreds[i].value;
        if (allIngreds[i].value > 0) {
            ingredList.push(allIngreds[i].value + " " + allIngreds[i].id);
            //TODO REMOVE PREVIOUS ENTRY IN LIST
            totalPrice += Number(allIngreds[i].dataset.price) * allIngreds[i].value;
            //console.log(allIngreds[i].dataset.price);
            console.log(allIngreds[i].id + " " + allIngreds[i].value + "x" + Number(allIngreds[i].dataset.price));
            // Number($(this).data('price'));
        }

    }
    console.log("total = " + totalPrice);
    document.getElementById('total').innerHTML = totalPrice;
    return totalPrice;

}





// ************************************************
// Shopping Cart API
// ************************************************

var shoppingCart = (function() {
    // =======================================================
    cart = [];

    defPizz = null;

    // Constructor
    function Item(name, price, count, size, pate, menu, elems) {
        this.name = name;
        this.price = price;
        this.count = count;
        this.size = size;
        this.pate = pate;
        this.menu = menu;
        this.elems = elems;
    }





    // Sauvegarder
    function saveCart() {
        sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
    }

    function setCustomPizza(p) {
        console.log("setting custom" + p)
        defPizz = p;
        saveCustomPizza();
    }

    function saveCustomPizza() {
        console.log("saved :" + defPizz);
        sessionStorage.setItem('customPizza', JSON.stringify(defPizz));
    }

    // Load le panier
    function loadCart() {
        cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
        emptyCart = false;
    }
    if (sessionStorage.getItem("shoppingCart") != null) {
        loadCart();
    }

    // Load  le custom pizza
    function loadCustomPizza() {
        console.log("loading custom");
        defPizz = JSON.parse(sessionStorage.getItem('customPizza'));
        //alert(defPizz + "hahaha");
        return JSON.parse(sessionStorage.getItem('customPizza'));
    }
    if (sessionStorage.getItem("customPizza") != null) {
        loadCustomPizza();
    }



    var obj = {};

    // Ajouter au panier 
    obj.addItemToCart = function(name, price, count, size, pate, menu, elems) {
        emptyCart = false;
        for (var item in cart) {
            if (cart[item].name === name) {
                cart[item].count++;
                saveCart();
                return;
            }
        }
        var item = new Item(name, price, count, size, pate, menu, elems);
        cart.push(item);
        saveCart();
    }


    // MAJ le count d'un item
    obj.setCountForItem = function(name, count) {
        for (var i in cart) {
            if (cart[i].name === name) {
                cart[i].count = count;
                break;
            }
        }
    };
    // Supprimer du panier
    obj.removeItemFromCart = function(name) {
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

    //Vide l'item specifié du panier
    obj.removeItemFromCartAll = function(name) {
        for (var item in cart) {
            if (cart[item].name === name) {
                cart.splice(item, 1);
                break;
            }
        }
        saveCart();
    }

    // vider le panier
    obj.clearCart = function() {
        cart = [];
        saveCart();
        emptyCart = true;
    }

    // Compter
    obj.totalCount = function() {
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

    // Total prix
    obj.totalCart = function() {
        var totalCart = 0;
        for (var item in cart) {
            totalCart += cart[item].price * cart[item].count;
        }
        return Number(totalCart.toFixed(2));
    }

    // Lister le panier
    obj.listCart = function() {
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

    obj.saveCart = function(p) {
        setCustomPizza(p);

        saveCustomPizza();
    }

    obj.getCustomPizza = function() {
        return loadCustomPizza();
        //return defPizz;
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


$('.clear-cart').click(function() {
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
            '<span class="badge badge-primary badge-pill"> ' + cartArray[i].count + ' </span></li>'

    }
    $('.show-cart-drop').html(output);
    $('.total-cart-drop').html(shoppingCart.totalCart());
    $('.total-count-drop').html(shoppingCart.totalCount());
    $('.total-count').html(shoppingCart.totalCount());
}



function displayCartModal() {
    var cartArray = shoppingCart.listCart();
    console.log(cartArray);
    var output = "";



    for (var i in cartArray) {
        var elemss = "";
        var menuContent = "";
        for (var j in cartArray[i].menu) {
            menuContent += cartArray[i].menu[j] + ", ";
        }
        //group elems elements with same name

        //put all elems in one string
        for (var k in cartArray[i].elems) {
            elemss += cartArray[i].elems[k] + ", ";
        }
        console.log(elemss)

        //console.log(cartArray[i].menu);
        if (cartArray[i].menu != null) {
            output += "<tr class =\"disCart\">" +
                "<td>" + cartArray[i].name + "+</td>" +
                "<td>(" + cartArray[i].price + ")</td>" +
                "<td>(" + menuContent + ")</td>" +
                "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name='" + cartArray[i].name + "'>-</button>" +
                "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>" +
                "<button class='plus-item btn btn-primary input-group-addon' data-name='" + cartArray[i].name + "'>+</button></div></td>" +
                "<td><button class='delete-item btn btn-danger' data-name='" + cartArray[i].name + "'>X</button></td>" +
                " = " +
                "<td>" + cartArray[i].total + "</td>" +
                "</tr>";
        } else if (cartArray[i].pate == null) {
            output += "<tr class =\"disCart\">" +
                "<td>" + cartArray[i].name + "</td>" +
                "<td>(" + cartArray[i].price + "£)</td>" +
                "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name='" + cartArray[i].name + "'>-</button>" +
                "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>" +
                "<button class='plus-item btn btn-primary input-group-addon' data-name='" + cartArray[i].name + "'>+</button></div></td>" +
                "<td><button class='delete-item btn btn-danger' data-name='" + cartArray[i].name + "'>X</button></td>" +
                " = " +
                "<td>" + cartArray[i].total + "</td>" +
                "</tr>";
        } else {
            /*
            if (cartArray[i].name.includes('Custom')) {
                output += "<tr class =\"disCart\">" +
                    "<td>" + cartArray[i].name + "</td>" +
                    "<td class='croutaille'>" + cartArray[i].pate + ", " + cartArray[i].size + "</td>" +
                    "<td>(" + elemss + ")</td>" +
                    "<td>(" + cartArray[i].price + "£)</td>" +
                    "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name='" + cartArray[i].name + "'>-</button>" +
                    "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>" +
                    "<button class='plus-item btn btn-primary input-group-addon' data-name='" + cartArray[i].name + "'>+</button></div></td>" +
                    "<td><button class='delete-item btn btn-danger' data-name='" + cartArray[i].name + "'>X</button></td>" +
                    " = " +
                    "<td>" + cartArray[i].total + "</td>" +
                    "</tr>";
            } else
            */
            output += "<tr class =\"disCart\">" +
                "<td>" + cartArray[i].name + "</td>" +
                "<td class='croutaille'>" + cartArray[i].pate + ", " + cartArray[i].size + "</td>" +
                "<td>(" + cartArray[i].price + "£)</td>" +
                "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name='" + cartArray[i].name + "'>-</button>" +
                "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>" +
                "<button class='plus-item btn btn-primary input-group-addon' data-name='" + cartArray[i].name + "'>+</button></div></td>" +
                "<td><button class='delete-item btn btn-danger' data-name='" + cartArray[i].name + "'>X</button></td>" +
                " = " +
                "<td>" + cartArray[i].total + "</td>" +
                "</tr>";
        }
    }

    for (var i in cmd) {
        pizza_cpr += "<tr>" + "<td>" + "Pizza_cp :" + cmd[i].id + ":" + cmd[i].ingred + "</td></tr>" + "<br>";

    }


    $('.show-cart').html(output);
    $('.show-cart').append(pizza_cpr);

    $('.total-cart').html(shoppingCart.totalCart());
    $('.total-count').html(shoppingCart.totalCount());
}

// Delete item button

$('.show-cart').on("click", ".delete-item", function(event) {
    var name = $(this).data('name')
    shoppingCart.removeItemFromCartAll(name);
    displayCart();

})


// -1
$('.show-cart').on("click", ".minus-item", function(event) {
        var name = $(this).data('name')
        shoppingCart.removeItemFromCart(name);
        displayCart();
    })
    // +1
$('.show-cart').on("click", ".plus-item", function(event) {
    var name = $(this).data('name')
    shoppingCart.addItemToCart(name);
    displayCart();
})

$('.show-cart').on("change", ".item-count", function(event) {
    var name = $(this).data('name');
    var count = Number($(this).val());
    shoppingCart.setCountForItem(name, count);
    displayCart();
});

displayCart();







function defaultPizza(p) {
    shoppingCart.setCustomPizza(p);

}



$('#suivant').click(function() {
    $.get("/login", function(data) {

    });
    location.reload(true);


});