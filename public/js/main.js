window.onload = function() {

    var navbarTemplate = require("./navbarTemplate.hbs");
    var bannerTemplate = require("./bannerTemplate.hbs");
    var topFiveTemplate = require("./topFiveTemplate.hbs");
    var productListTemplate = require("./productSearchedList.hbs");
    var itemDetailTemplate = require("./itemDetailTemplate.hbs");
    var itemViewTemplate = require("./itemViewTemplate.hbs");
    var uploadItemTemplate = require("./uploadItemTemplate.hbs");
    var profileTemplate = require("./profileTemplate.hbs");
    var footerTemplate = require("./footerTemplate.hbs")
    try {
        createNavbar();
    } catch (error) {}
    try {
        createAdsBanner();
    } catch (error) {}
    try {
        createFooter();
    } catch (error) {}
    try {
        createTopFive();
    } catch (error) {}
    try {
        createProfile();
    } catch (error) {}

    try {
        createProductList();
    } catch (error) {}

    try {
        createUploadItem();
    } catch (error) {}

    try {
        createItemDetail();
    } catch (error) {}
    try {
        createItemView();
    } catch (error) {}

    function createNavbar() {
        var template = document.getElementById("nav-bar");
        template.innerHTML = navbarTemplate();
    }

    function createFooter() {
        var template = document.getElementById("footer");
        template.innerHTML = footerTemplate();
    }

    function createAdsBanner() {
        var template = document.getElementById("home-banner");
        template.innerHTML = bannerTemplate();
    }

    function createAdsBanner() {
        var template = document.getElementById("upload-item");
        template.innerHTML = uploadItemTemplate();
    }

    function createTopFive() {
        var template = document.querySelectorAll('[id=top-five]');
        var i;
        for (i = 0; i < template.length; i++) {
            template[i].innerHTML = topFiveTemplate();
        }
    }

    function createProfile() {
        var template = document.getElementById("profile-detail");
        template.innerHTML = profileTemplate();
    }

    function createProductList() {
        var template = document.getElementById("product-list");
        template.innerHTML = productListTemplate();
    }

    function createItemView() {
        var template = document.querySelectorAll('[id=item-view]');
        var i;
        for (i = 0; i < template.length; i++) {
            template[i].innerHTML = itemViewTemplate();
        }
        // itemView.forEach(element => {
        //     element.innerHTML = itemViewTemplate();
        //     console.log(element);
        // });
    }

    function createItemDetail() {
        var template = document.getElementById("item-detail");
        template.innerHTML = itemDetailTemplate();
    }

}