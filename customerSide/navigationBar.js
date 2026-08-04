document.write(`
<style>
.navbar{
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding:20px 60px;
    font-family:'Fredoka',sans-serif;
    background:#f9e2e6;
    height:103px;
    box-shadow:0 2px 10px rgba(92,50,20,0.06);
    position:relative;
    z-index:10;
}
.nav-links{display:flex;gap:40px;}
.nav-links a{
    text-decoration:none;
    color:#5c3214;
    font-weight:500;
    position:relative;
    padding-bottom:4px;
    transition:color .2s;
}
.nav-links a::after{
    content:'';
    position:absolute;
    left:0;bottom:0;
    width:0;
    height:2px;
    background:#5c3214;
    transition:width .25s ease;
}
.nav-links a:hover::after,
.nav-links a.active::after{width:100%;}
.nav-links a.active{font-weight:700;}
.nav-icons{display:flex;gap:20px;align-items:center;}
.nav-icons > a > img{height:24px;transition:transform .2s;}
.nav-icons > a:hover > img{transform:scale(1.15);}

.profile-wrap{position:relative;}
.profile-wrap img{height:24px;cursor:default;transition:transform .2s;display:block;}
.profile-wrap:hover img{transform:scale(1.15);}

.profile-dropdown{
    position:absolute;
    top:calc(100% + 12px);
    right:0;
    width:150px;
    background:#fff;
    border-radius:10px;
    overflow:hidden;
    box-shadow:0 10px 25px rgba(92,50,20,0.2);
    opacity:0;
    visibility:hidden;
    transform:translateY(-6px);
    transition:opacity .2s, transform .2s, visibility .2s;
}
.profile-wrap:hover .profile-dropdown{
    opacity:1;
    visibility:visible;
    transform:translateY(0);
}
.profile-dropdown a{
    display:block;
    padding:12px 20px;
    text-decoration:none;
    font-weight:700;
    font-size:.95rem;
    text-align:center;
}
.profile-dropdown .dd-profile{
    background:#ffffff;
    color:#5c3214;
    cursor:default;
    pointer-events:none;
}
.profile-dropdown .dd-orders{
    background:#ffffff;
    color:#5c3214;
    transition:background .2s;
}
.profile-dropdown .dd-orders:hover{
    background:#fdf6f2;
}
.profile-dropdown .dd-logout{
    background:#f28b82;
    color:#5c3214;
}
.profile-dropdown .dd-logout:hover{background:#ef776d;}
</style>

<header class="navbar">

    <nav class="nav-links">
        <a href="userLandingPage.html" data-page="home">Home</a>
        <a href="productsPage.html" data-page="product">Product</a>
        <a href="aboutUsPage.html" data-page="about">About Us</a>
        <a href="faqsPage.html" data-page="faqs">FAQs</a>
    </nav>

    <div class="nav-icons">
        <a href="cartPage.html">
            <img src="../images/cart.png" alt="PLACEHOLDER: cart icon">
        </a>

        <div class="profile-wrap">
            <img src="../images/profile.png" alt="PLACEHOLDER: user icon">
            <div class="profile-dropdown">
                <a href="#" class="dd-profile">Profile</a>
                <a href="orderTrackingPage.html" class="dd-orders">Orders</a>
                <a href="../publicPages/loginPage.html" class="dd-logout">Log Out</a>
            </div>
        </div>
    </div>
</header>
`);

document.addEventListener('DOMContentLoaded', () => {
  const current = window.CURRENT_PAGE || '';
  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.dataset.page === current) link.classList.add('active');
  });
});