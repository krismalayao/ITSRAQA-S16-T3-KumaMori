document.write(`
<style>
.site-footer{display:flex;align-items:center;justify-content:space-between;background:#f9e2e6;padding:30px 80px;font-family:'Fredoka',sans-serif;}
.footer-logo img{height:50px;transition:transform .2s;}
.footer-logo img:hover{transform:rotate(-6deg) scale(1.05);}
.footer-social p{margin-bottom:8px;font-weight:600;color:#5c3214;}
.social-icons{display:flex;gap:18px;font-size:1.4rem;}
.social-icons a{
    color:#5c3214;
    text-decoration:none;
    display:inline-flex;
    align-items:center;
    justify-content:center;
    width:38px;height:38px;
    border-radius:50%;
    background:#fff;
    transition:background .2s, color .2s, transform .2s;
}
.social-icons a:hover{background:#5c3214;color:#f9e2e6;transform:translateY(-3px);}
</style>

<footer class="site-footer">
    <div class="footer-logo">
        <img src="../images/publicPages.png" alt="PLACEHOLDER: Kuma Mori footer logo">
    </div>

    <div class="footer-social">
        <p>Social Media</p>
        <div class="social-icons">
            <a href="https://facebook.com/kumamori" target="_blank">
                <i class="fa-brands fa-facebook"></i>
            </a>
            <a href="https://instagram.com/kumamori" target="_blank">
                <i class="fa-brands fa-instagram"></i>
            </a>
            <a href="https://tiktok.com/@kumamori" target="_blank">
                <i class="fa-brands fa-tiktok"></i>
            </a>
        </div>
    </div>
</footer>
`);